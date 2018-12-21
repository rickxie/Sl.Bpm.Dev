using System.Collections.Generic;
using System.Data;
using System.Linq;
using Sl.Bpm.Application.Module;
using System;
using Senparc.Weixin.Work.AdvancedAPIs.MailList;
using Senparc.Weixin.Work.Containers;
using Senparc.Weixin.Work.AdvancedAPIs;
using System.Configuration;
using Sl.Bpm.Engine.Db;
using System.Collections;
using System.Text;
using Senparc.CO2NET.RegisterServices;
using Senparc.CO2NET;
using Senparc.Weixin.Entities;
using Senparc.Weixin;
using System.Runtime.Remoting;

namespace Sl.Bpm.AppPages.Func.msgsending01_f2e144897b7a401d9c70436c5d1d8684
{
    /// <summary>
    /// 消息推送 \\Function\\msgsending01\\msgsending01.cs
    /// </summary>
    /// 
    public class msgsending01 : PageModuleBase
    {
         
        //TODO:自定义模块需要使用的方法
        //所有输入参数必须为 ArgsInput
        //输出参数可以为DataTable 和 简单类型
        public string CorpId;
        public string ContactAppSecret;
        public string OdfAppAgentId;
        public string OdfAppSecret;
        public string Debug;

        public override void Intialize()
        {
            CorpId = this.Config.Get("QiyeWeixin.CorpId");
            ContactAppSecret = this.Config.Get("QiyeWeixin.ContactAppSecret");
            OdfAppSecret = this.Config.Get("QiyeWeixin.OdfAppSecret");
            OdfAppAgentId = this.Config.Get("QiyeWeixin.OdfAppAgentId");
            // 微信sdkQiyeWeixin.OdfAppAgentId
            var isGLobalDebug = false;//设置全局 Debug 状态
            var register = RegisterService.Start(new SenparcSetting(isGLobalDebug)).UseSenparcGlobal();//CO2NET全局注册，必须！
            var senparcWeixinSetting = SenparcWeixinSetting.BuildFromWebConfig(isGLobalDebug);
            register.UseSenparcWeixin(senparcWeixinSetting, new SenparcSetting(isGLobalDebug));////微信全局注册，必须！

        }

        public TreeData GetCurWxDeptsAndUsers(ArgsInput args)
        {
            var userId = args["userId"];
            TreeData root = new TreeData();
            string MsgErr = null;
            try
            {
                string accessToken = AccessTokenContainer.TryGetToken(CorpId, ContactAppSecret);
                var depts = MailListApi.GetDepartmentList(accessToken);// 全量组织架构
                var deptMembers = MailListApi.GetDepartmentMember(accessToken, 1, 1);
                depts.department.Sort((dpt1, dpt2) => (int)(dpt1.parentid - dpt2.parentid));
                var rootDept = depts.department[0];
                root.IsRoot = true;
                root.Opened = true;
                root.Text = rootDept.name;
                root.Children = new List<TreeData>();
                root.Id = rootDept.id;
                root.PId = rootDept.parentid;
                root.WxUsers = new List<UserList_Simple>();

                foreach (var wxu in deptMembers.userlist)
                {
                    if (wxu.department.Contains(root.Id))
                    {
                        root.WxUsers.Add(wxu);
                    }
                }
                var tempDepts = depts.department
                    .Skip(1).ToArray()
                    ;
                for (int i = 0; i < tempDepts.Count(); i++)
                {// 循环遍历每一个部门，找到这个部门的父部门
                    var dept = tempDepts[i];
                    TreeDataHelper(root,deptMembers.userlist, dept);
                }
            }
            catch(Exception e)
            {
                MsgErr = e.Message;
                root.Text = CorpId+":"+ContactAppSecret+":"+MsgErr;
            }
            return root;
        }
        public bool SendMsg(ArgsInput args)
        {
            try
            {
                string accessToken = AccessTokenContainer.TryGetToken(CorpId, OdfAppSecret);
                string content = args["message"];//要发送的文本内容
                bool secret = bool.Parse(args["secret"]??"false");
                List<UserList_Simple> wxUsers = Deserialize<List<UserList_Simple>>(args["wxUsers"]);
                //测试时候，可以将企业微信后台对应的人员WxUserId放到数组里面
                //指定为@all，则向关注该企业应用的全部成员发送
               var  wxUserIds = wxUsers.Count>0?wxUsers.Select(u=>u.userid).ToList(): new List<string>()
            {
                   "HuangManBiao"
                //"LiZiWei",
                //"mc",

            };
                content = content??"测试数据";
                // 发送消息，会为每一个用户记录一行数据，将来判断用户是否
                string sendToUsers = string.Join("|", wxUserIds);
                var sqls = new ArrayList();
                var msgId = Guid.NewGuid().ToString();
                var createTime = DateTime.Now;
                foreach(var u in wxUsers)
                {
                    StringBuilder sb = new StringBuilder();
                    sb.Append("insert into [Yfss.Bpm].[dbo].[t_notification] (");
                    sb.Append("[Id],");
                    sb.Append("[TaskId],");
                    sb.Append("[SnNumber],");
                    sb.Append("[CreationTime],");
                    sb.Append("[MsgId],");
                    sb.Append("[Type],");
                    sb.Append("[Theme],");
                    sb.Append("[Content],");
                    sb.Append("[RoleId],");
                    sb.Append("[ReceiptTime],");
                    sb.Append("[Status],");
                    //sb.Append("[FeebackTime],");
                    sb.Append("[MsgSource],");
                    sb.Append("[MsgSourceName])");
                    sb.Append("values(newid(),");// id
                    sb.Append("newid(),");// taskid
                    sb.Append("newid(),");// sn
                    sb.Append("'");sb.Append(createTime);sb.Append("',");// msgid
                    sb.Append("'");sb.Append(msgId);sb.Append("',");// msgid
                    sb.Append("'text',");// 文本
                    sb.Append("'',");// 主题
                    sb.Append("'");sb.Append(content);sb.Append("',");
                    sb.Append("'");sb.Append(u.userid);sb.Append("',");
                    sb.Append("'");sb.Append(createTime);sb.Append("',");
                    sb.Append(0);//未读
                    sb.Append(",");
                    //sb.Append(",");// 反馈时间
                    sb.Append("'',");//消息来源
                    sb.Append("''");//消息来源名称
                    sb.Append(")");//消息来源名称
                    sqls.Add(sb.ToString());
                }
                var cnt = "<a href=" + "'"+ConfigurationManager.AppSettings["OdfAppServerHost"] +"/OrderFood/WxAuthLogin?checkMsgRead=true&msgId="+msgId+"'>" + content + "</a>";
                MassApi.SendText(accessToken, OdfAppAgentId, cnt, sendToUsers,null,null, secret?1:0);// 保密发送
                DBHelper.RunInTransaction(sqls);// 发送成功，才执行插入动作
            }
            catch(Exception e)
            {
                Debug = e.ToString();
                return false;
            }
            return true;
        }
        private TreeData TreeDataHelper(TreeData root, List<UserList_Simple> wxUsers, DepartmentList dept)
        {
            // 跟部门以外的部门
            TreeData treeData = new TreeData();
            treeData.Id = dept.id;
            treeData.PId = dept.parentid;
            treeData.Text = dept.name;
            treeData.Children = new List<TreeData>();
            treeData.WxUsers = new List<UserList_Simple>();
            if (dept.parentid == 1)
            {
                treeData.Opened = true;
            }
            foreach (var wxu in wxUsers)
            {// 这个部门的用户
                if (wxu.department.Contains(dept.id))
                {
                    treeData.WxUsers.Add(wxu);
                }
            }
            int count = treeData.WxUsers.Count;
            StringBuilder sb = new StringBuilder();
            foreach (var wxu in treeData.WxUsers)
            {       sb.Clear();
                sb.Append(treeData.Id);
                sb.Append(count--);
                treeData.Children.Add(new TreeData() {
                    Text=wxu.name,
                    PId=treeData.Id,//人员全部列出在这个节点下面
                    // 为了能够唯一确定id，可以将pid做前缀，后缀一次增加人员数量
                    Id=int.Parse(sb.ToString()),
                    WxUsers= new List<UserList_Simple>() {
                        new UserList_Simple()
                        {
                            userid=wxu.userid,
                            name=wxu.name
                        }
                    }
                });
            }
            if (dept.parentid == root.Id)
            {// 找到其父部门
                root.Children.Add(treeData);
            }
            else
            {// 未找到其父部门，到其下子部门找（如果还有子部门）
                foreach (var c in root.Children)
                {
                    TreeDataHelper(c, wxUsers, dept);
                }
            }
            return root;
        }
        [Serializable]
        public class TreeData: MarshalByRefObject {
            public string Text { set; get; }
            public bool Opened { set; get; }
            public long Id { set; get; }
            public long PId { set; get; }
            public bool IsRoot { set; get; }
            public List<TreeData> Children { set; get; }
            public List<UserList_Simple> WxUsers { set; get; }

        }
    }
}