/*===================================================
 * 类名称: OrganizeExpert
 * 文件名: \Base\Expert\OrganizeExpert
 * 类描述: 组织结构管理
 * 创建人: MC
 * 创建时间: 2018-12-27 17:19:47
 * CodeItemId : 0b3084a9-0a12-4db9-b7e9-438ec0d13962
 * 版本： @version 1.0
 *===================================================*/
using Sl.Bpm.Application.Module;
using Sl.Bpm.Repository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Sl.Bpm.AppPages.Base
{
    public class OrganizeExpert : ScheduleModuleBase
    {
        Dictionary<EnumGroupLevel, GroupDefaultValue> DifinedGroup = new Dictionary<EnumGroupLevel, GroupDefaultValue>()
        {
            // 公司负责人 估计用不上
            { EnumGroupLevel.Company, new GroupDefaultValue(){ JobCode = "CEO", EnumGroupLevel = "1", JobLangName = "bd952f42-2ca6-47ef-a716-adcd8e01ddc7"} },
            // 事业部负责人
            { EnumGroupLevel.BusinessUnit, new GroupDefaultValue(){ JobCode = "BU", EnumGroupLevel = "2", JobLangName = "408f0a76-9ff9-4c36-bc40-16cdb87bf204"} },
            // 成本中心负责人
            { EnumGroupLevel.CostCenter, new GroupDefaultValue(){ JobCode = "CC", EnumGroupLevel = "3", JobLangName = "43ab6648-3458-457c-b276-4c0bf108e072"} },
            // 项目负责人
            { EnumGroupLevel.Project, new GroupDefaultValue(){ JobCode = "PM", EnumGroupLevel = "4", JobLangName = "8d062c20-862d-4e20-8081-edadc10eee7e"} }
        };
        /// <summary>
        /// DECLARE @GroupCode NVARCHAR(50) --组织Code
        /// DECLARE @UserId NVARCHAR(50) --UserId
        /// DECLARE @ParentGroupId NVARCHAR(50)--父组织
        /// DECLARE @JobCode NVARCHAR(50)--岗位代码
        /// DECLARE @GroupCnName NVARCHAR(50)--组织中文名
        /// DECLARE @GroupEnName NVARCHAR(50)--组织英文名
        /// DECLARE @JobLangName NVARCHAR(50)--岗位名
        /// DECLARE @EnumGroupType NVARCHAR(50) --组织级别
        /// </summary>
        public const string SQL_NEW_GROUP = @"
--DECLARE @GroupId NVARCHAR(50) = (SELECT NEWID())
DECLARE @GroupLangName NVARCHAR(50) = (SELECT NEWID())
DECLARE @JobId NVARCHAR(50) = (SELECT NEWID())
DECLARE @EnterpriseId NVARCHAR(50) = (SELECT TOP 1 Id FROM dbo.AppEnterprise)
DECLARE @JobLevel NVARCHAR(50) = (SELECT TOP 1 JobLevel FROM dbo.t_staff WHERE AppUserId = @UserId)
DECLARE @ParentJobId NVARCHAR(50) = (SELECT TOP 1 Id  FROM dbo.BpmJob WHERE GroupId = @ParentGroupId AND IsRoot = 1 AND IsDeleted = 0)

 
--插入组织中文
INSERT INTO dbo.AppLanguage
        ( Id ,
          [Key] ,
          Value ,
          LanguageCulture 
        )
VALUES  ( NEWID() , -- Id - nvarchar(50)
          @GroupLangName , -- Key - nvarchar(512)
          @GroupCnName , -- Value - nvarchar(512)
          N'zh-CN'-- LanguageCulture - nvarchar(50)
        )
--插入组织英文
INSERT INTO dbo.AppLanguage
        ( Id ,
          [Key] ,
          Value ,
          LanguageCulture 
        )
VALUES  ( NEWID() , -- Id - nvarchar(50)
          @GroupLangName , -- Key - nvarchar(512)
          @GroupEnName , -- Value - nvarchar(512)
          N'en'-- LanguageCulture - nvarchar(50)
        )
--插入组织表
INSERT INTO dbo.BpmGroup
        ( Id ,
          LangName ,
          ParentGroupId ,
          EnumGroupType ,
          AreaCode ,
          Memo ,
          DisplayOrder ,
          Code ,
          EnumGroupLevel ,
          EnterpriseId ,
          IsRoot ,
          IsDeleted ,
          IdNo ,
          ParentIdNo
        )
VALUES  ( @GroupId , -- Id - nvarchar(50)
          @GroupLangName , -- LangName - nvarchar(200)
          @ParentGroupId , -- ParentGroupId - nvarchar(100)
          @EnumGroupType , -- EnumGroupType - nvarchar(100)
          NULL , -- AreaCode - nvarchar(100)
          NULL , -- Memo - nvarchar(1000)
          0 , -- DisplayOrder - int
          @GroupCode , -- Code - nvarchar(50)
          @EnumGroupType , -- EnumGroupLevel - nvarchar(20)
          @EnterpriseId , -- EnterpriseId - nvarchar(100)
          0 , -- IsRoot - bit
          0 , -- IsDeleted - bit
          NULL , -- IdNo - int
          NULL  -- ParentIdNo - int
        )

INSERT INTO dbo.BpmJob
        ( Id ,
          Code ,
          LangName ,
          EnumJobLevel ,
          IsPrimary ,
          IsLeader ,
          GroupId ,
          ParentJobId ,
          DisplayOrder ,
          IsRoot ,
          EnterpriseId ,
          IsDeleted
        )
VALUES  ( @JobId , -- Id - nvarchar(50)
          @JobCode , -- Code - nvarchar(50)
          @JobLangName , -- LangName - nvarchar(50)
          @JobLevel , -- EnumJobLevel - int
          1 , -- IsPrimary - bit
          1 , -- IsLeader - bit
          @GroupId , -- GroupId - nvarchar(50)
          @ParentJobId , -- ParentJobId - nvarchar(50)
          0 , -- DisplayOrder - int
          1 , -- IsRoot - bit
          @EnterpriseId , -- EnterpriseId - nvarchar(50)
          0  -- IsDeleted - bit
        )

INSERT INTO dbo.BpmJobUser
        ( Id ,
          JobId ,
          UserId ,
          EnterpriseId ,
          IsPrimary ,
          IsDeleted 
        )
VALUES  ( NEWID() , -- Id - nvarchar(50)
          @JobId , -- JobId - nvarchar(100)
          @UserId , -- UserId - nvarchar(100)
          @EnterpriseId , -- EnterpriseId - nvarchar(100)
          1 , -- IsPrimary - bit
          0 -- IsDeleted - bit
        )";

        public readonly string SQL_MOVE_GROUP = @"

DECLARE @NewJobId NVARCHAR(50)  = (SELECT TOP 1 Id FROM dbo.BpmJob WHERE GroupId = @NewParentGroupId AND IsRoot = 1 AND IsDeleted = 0)
DECLARE @GroupId NVARCHAR(50) = (SELECT TOP 1 Id FROM dbo.BpmGroup WHERE Code = @GroupCode)

IF NOT EXISTS(SELECT TOP 1 Id FROM dbo.BpmGroup WHERE Code = @GroupCode)
RAISERROR('Group Code %s is not exists', 16, 1, @GroupCode)

IF NOT EXISTS(SELECT TOP 1 Id FROM dbo.BpmGroup WHERE Id = @NewParentGroupId)
RAISERROR('Group Id %s is not exists', 16, 1, @NewParentGroupId)

 
UPDATE dbo.BpmGroup SET ParentGroupId = @NewParentGroupId WHERE Code = @GroupCode
UPDATE dbo.BpmJob SET ParentJobId = @NewJobId WHERE GroupId = @GroupId AND IsRoot = 1 AND IsDeleted = 0 
";

        public const string SQL_CHANGE_OWNER = @"
DECLARE @GroupId NVARCHAR(50) = (SELECT TOP 1 Id FROM dbo.BpmGroup WHERE Code = @GroupCode)
DECLARE @JobId NVARCHAR(50) =  (SELECT TOP 1 Id FROM dbo.BpmJob WHERE GroupId = @GroupId AND IsRoot = 1)


IF NOT EXISTS(SELECT TOP 1 Id FROM dbo.BpmGroup WHERE Id = @GroupId)
RAISERROR('Group Id %s is not exists', 16, 1, @GroupId)

IF NOT EXISTS(SELECT TOP 1 Id FROM dbo.AppUser WHERE Id = @NewUserId)
RAISERROR('User Id %s is not exists', 16, 1, @NewUserId)



UPDATE dbo.BpmJobUser SET UserId = @NewUserId WHERE JobId = @JobId
";
//DECLARE @GroupCode NVARCHAR(50)
//DECLARE @JobCode NVARCHAR(50)
//DECLARE @JobLevel NVARCHAR(50)
//DECLARE @JobCnName NVARCHAR(50)
//DECLARE @JobEnName NVARCHAR(50)
//DECLARE @UserId NVARCHAR(50)
        public const string SQL_NEW_JOB = @"

DECLARE @GroupId NVARCHAR(50) = ( SELECT TOP 1
                                            Id
                                  FROM      dbo.BpmGroup
                                  WHERE     Code = @GroupCode
                                )
DECLARE @GroupJobId NVARCHAR(50) = ( SELECT TOP 1
                                            Id
                                     FROM   dbo.BpmJob
                                     WHERE  GroupId = @GroupId
                                            AND IsRoot = 1
                                   )
DECLARE @NewJobId NVARCHAR(50)  = ( SELECT TOP 1
                                            NEWID()
                                  )
DECLARE @EnterpriseId NVARCHAR(50) = ( SELECT TOP 1
                                                Id
                                       FROM     dbo.AppEnterprise
                                     )
DECLARE @JobLangName NVARCHAR(50)

SELECT TOP 1
        @JobLangName = l.[Key]
FROM    dbo.AppLanguage l
        INNER JOIN dbo.AppLanguage l2 ON l2.[Key] = l.[Key]
WHERE   l.LanguageCulture = 'zh-CN'
        AND l2.LanguageCulture = 'en'
        AND l.EntityId IS NULL
        AND l.Value = @JobCnName
        AND l2.Value = @JobEnName
ORDER BY l.[Key]

IF NOT EXISTS ( SELECT  1
                WHERE   ISNULL(@JobLangName, '') = '' )
    BEGIN
        SELECT  @JobLangName = NEWID()

--插入组织中文
        INSERT  INTO dbo.AppLanguage
                ( Id ,
                  [Key] ,
                  Value ,
                  LanguageCulture 
                )
        VALUES  ( NEWID() , -- Id - nvarchar(50)
                  @JobLangName , -- Key - nvarchar(512)
                  @JobCnName , -- Value - nvarchar(512)
                  N'zh-CN'-- LanguageCulture - nvarchar(50)
                )
--插入组织英文
        INSERT  INTO dbo.AppLanguage
                ( Id ,
                  [Key] ,
                  Value ,
                  LanguageCulture 
                )
        VALUES  ( NEWID() , -- Id - nvarchar(50)
                  @JobLangName , -- Key - nvarchar(512)
                  @JobEnName , -- Value - nvarchar(512)
                  N'en'-- LanguageCulture - nvarchar(50)
                )
    END



INSERT  INTO dbo.BpmJob
        ( Id ,
          Code ,
          LangName ,
          EnumJobLevel ,
          IsPrimary ,
          IsLeader ,
          GroupId ,
          ParentJobId ,
          DisplayOrder ,
          IsRoot ,
          EnterpriseId ,
          IsDeleted
        )
VALUES  ( @NewJobId , -- Id - nvarchar(50)
          @JobCode , -- Code - nvarchar(50)
          @JobLangName , -- LangName - nvarchar(50)
          @JobLevel , -- EnumJobLevel - int
          1 , -- IsPrimary - bit
          1 , -- IsLeader - bit
          @GroupId , -- GroupId - nvarchar(50)
          @GroupJobId , -- ParentJobId - nvarchar(50)
          0 , -- DisplayOrder - int
          0 , -- IsRoot - bit
          @EnterpriseId , -- EnterpriseId - nvarchar(50)
          0  -- IsDeleted - bit
        )
INSERT  INTO dbo.BpmJobUser
        ( Id ,
          JobId ,
          UserId ,
          EnterpriseId ,
          IsPrimary ,
          IsDeleted
        )
VALUES  ( NEWID() , -- Id - nvarchar(50)
          @NewJobId , -- JobId - nvarchar(100)
          @UserId , -- UserId - nvarchar(100)
          @EnterpriseId , -- EnterpriseId - nvarchar(100)
          1 , -- IsPrimary - bit
          0 -- IsDeleted - bit
        )";
//成本中心负责人：408f0a76-9ff9-4c36-bc40-16cdb87bf204
//事业部负责人：43ab6648-3458-457c-b276-4c0bf108e072
//项目经理：8d062c20-862d-4e20-8081-edadc10eee7e
        private ModuleRepository _db;
        public OrganizeExpert(ModuleRepository db)
        {
            _db = db;
        }
        /// <summary>
        /// 新增组织，其中 newGroup中的ParentGroupId 为新增的组织机构所处的Group的Id。例如 项目所处的Cc的GroupId
        /// </summary>
        /// <param name="level"></param>
        /// <param name="newGroup"></param>
        public void AddGroup(EnumGroupLevel level, NewGroupDto newGroup)
        {
            _db.Execute(SQL_NEW_GROUP, new
            {
                GroupId = newGroup.GroupId,
                @GroupCode = newGroup.GroupCode,
                @UserId = newGroup.OwnerId,
                @ParentGroupId = newGroup.ParentGroupId,
                @JobCode = DifinedGroup[level].JobCode,
                @GroupEnName = newGroup.GroupEnName,
                @GroupCnName = newGroup.GroupCnName,
                @JobLangName = DifinedGroup[level].JobLangName,
                @EnumGroupType = DifinedGroup[level].EnumGroupLevel
            });
        }
        /// <summary>
        /// 将原组织移动到新组织
        /// </summary>
        /// <param name="level"></param>
        /// <param name="group"></param>
        public void MoveGroup(MoveGroupDto group)
        {
            _db.Execute(SQL_MOVE_GROUP, new
            {
                @GroupCode = group.GroupCode,
                NewParentGroupId = group.NewParentGroupId,
            });
        }

        /// <summary>
        /// 更换组织控制人
        /// </summary>
        /// <param name="owner"></param>
        public void ChangeGroupOwner(ChangeOwnerDto owner)
        {
            _db.Execute(SQL_CHANGE_OWNER, new
            {
                owner.NewUserId,
                owner.GroupCode
            });
        }

        /// <summary>
        /// 将用户加入岗位中
        /// </summary>
        /// <param name="newMember"></param>
        public void AddUserToProject(NewProjectMemberDto newMember)
        {
            _db.Execute(SQL_NEW_JOB, new
            {
                newMember.GroupCode,
                newMember.JobCnName,
                newMember.JobEnName,
                newMember.JobLevel,
                newMember.JobCode,
                newMember.UserId
            });
        }
    }
    public class GroupDefaultValue
    {
        public string JobLangName { get; set; }
        public string JobCode { get; set; }
        public string EnumGroupLevel { get; set; }
    }


    /// <summary>
    /// 新增组织结构
    /// </summary>
    public class NewGroupDto
    {
        public string GroupId { get; set; }
        public string GroupCode { get; set; }
        public string ParentGroupId { get; set; }
        public string GroupCnName { get; set; }
        public string GroupEnName { get; set; }
        public string OwnerId { get; set; }
    }


    /// <summary>
    /// 移动组织
    /// </summary>
    public class MoveGroupDto
    {
        public string GroupCode { get; set; }
        public string NewParentGroupId { get; set; }
    }

    public class ChangeOwnerDto {
        public string GroupCode { get; set; }
        public string NewUserId { get; set; }
    }
    /// <summary>
    /// 项目新增成员
    /// </summary>
    public class NewProjectMemberDto
    {
        public string UserId { get; set; }
        public string GroupCode { get; set; }
        public string JobCode { get; set; }
        public string JobEnName { get; set; }
        public string JobCnName { get; set; }
        public string JobLevel { get; set; }
    }
    public enum EnumGroupLevel {
        Company = 1, // 公司负责人
        BusinessUnit = 2, // 公司负责人
        CostCenter = 3, // 公司负责人
        Project      = 4, // 公司负责人
    }
}