using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace Sl.Bpm.Client
{
    public static class BundleConfig
    { 
            public static void RegisterBundles(BundleCollection bundles)
            {
                bundles.IgnoreList.Clear();


                var baseCss = new StyleBundle("~/base/css") { Orderer = new AsIsBundleOrderer() };
                var bseJs = new ScriptBundle("~/base/js") { Orderer = new AsIsBundleOrderer() };

                List<StaticResource> js_Sources = new List<StaticResource>()
            {

                new StaticResource(){ Group = 0x00010, Path = "~/Content/Lib_mobile/ionic/dist/ionic.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00010, Path = "~/Content/Lib/miniAbp/framework/utility.js", SearchParttern = null, SubFolder = false },
                
                //jquery
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/jquery-1.11.3/jquery-1.11.3.js", SearchParttern = null, SubFolder = false},
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/jquery-1.10.2/jquery.cookie.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/ECharts/echarts.min.js", SearchParttern = null, SubFolder = false },
                                                     
                 //语法高亮                         
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/component/codeprettify/js/prettify.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/component/codeprettify/js/lang-sql.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/component/sheetJs/xlsx.core.min.js", SearchParttern = null, SubFolder = false },
                                                     
                //zui component start                
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/component/tooltip/tooltip.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/zui-1.8.1/js/zui.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/zui-1.8.1/lib/datatable/zui.datatable.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/zui-1.8.1/lib/bootbox/bootbox.min.js", SearchParttern = null, SubFolder = false },


                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/lodash/lodash-3.10.1.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/moment/moment.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/angularjs/angular.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/angularjs/angular-translate.js", SearchParttern = null, SubFolder = false },

                new StaticResource(){ Group = 0x11010, Path = "~/Content/Lib/moment/moment-with-locales.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11010, Path = "~/Content/Lib/moment/moment-timezone-with-data.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/zui-1.8.1/lib/datetimepicker/datetimepicker.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/angularjs/angular-sanitize.min.js", SearchParttern = null, SubFolder = false },


                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/angularjs/angular-strap/angular-strap.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/angularjs/angular-strap/angular-strap.tpl.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11010, Path = "~/Content/Lib/angularjs/angular-file-upload.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/angularjs/angular-ui/angular-animate.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/angularjs/angular-ui/ui-bootstrap.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/angularjs/angular-ui/ui-bootstrap-tpls.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/angularjs/angular-ui/angular-ui-router.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/angularjs/ocLazyLoad/ocLazyLoad.min.js", SearchParttern = null, SubFolder = false },

                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/component/w5cvalidator/w5cvalidator.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/trNgGrid/trNgGrid.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/pnotify/pnotify.custom.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00100, Path = "~/Content/Lib/component/noslider/nouislider.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/Backstretch/jquery.backstretch.min.js", SearchParttern = null, SubFolder = false },
                                                     
                //jqgrid                             
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/JQGrid/js/jquery.jqGrid.src.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/JQGrid/js/i18n/grid.locale-cn.js", SearchParttern = null, SubFolder = false },
                                                     
                //layer                              
                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/layer/layer.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x01000, Path = "~/Content/Scripts/layerConfig.js", SearchParttern = null, SubFolder = false },
                                                    
                //组织树相关js                      
                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/component/jstree/jstree.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00100, Path = "~/Content/Lib/des-lib/des/js/raphael.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00100, Path = "~/Content/Lib/requirejs/requirejs-2.1.11.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00100, Path = "~/Content/Lib/des-lib/des/js/seajs/sea.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00100, Path = "~/Content/Lib/des-lib/des/js/seajs/seajs-text.js", SearchParttern = null, SubFolder = false },


                new StaticResource(){ Group = 0x01100, Path = "~/Content/Lib/component/select2/select2.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x01100, Path = "~/Content/Lib/ng-sortable/Sortable.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x01100, Path = "~/Content/Lib/ng-sortable/ng-sortable.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/smartMenu/jquery-smartMenu.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/requirejs/requirejs-2.1.11.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/zrender/zrender.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/org-tree/orgChart.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/org-tree/orgChartDirective.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/SimpleExcel/simple-excel.js", SearchParttern = null, SubFolder = false },
                                                     
                //设计器相关                         
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/miniabp/framework/mabp.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/miniabp/framework", SearchParttern = "*.js", SubFolder = true,IsIncludeDirectory=true },
                new StaticResource(){ Group = 0x11110, Path = "~/_runtime/opt", SearchParttern = "*.js", SubFolder = true,IsIncludeDirectory=true},
                new StaticResource(){ Group = 0x11100, Path = "~/App/_shared/shared.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00010, Path = "~/App/_shared/shared_mobile.min.js", SearchParttern = null, SubFolder = false },


                new StaticResource(){ Group = 0x10000, Path = "~/App/ViewJs/Shared", SearchParttern = "*.js", SubFolder = true ,IsIncludeDirectory=true},
                new StaticResource(){ Group = 0x10000, Path = "~/App/SysPages/views", SearchParttern = "*.js", SubFolder = true ,IsIncludeDirectory=true},
                new StaticResource(){ Group = 0x11000, Path = "~/App/_form/form.min.js", SearchParttern = null, SubFolder = false },


                new StaticResource(){ Group = 0x01010, Path = "~/App/SysPages/app.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00010, Path = "~/App/_form/form_mobile.min.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x01000, Path = "~/App/SysPages", SearchParttern = "*.js", SubFolder = true ,IsIncludeDirectory=true },

                new StaticResource(){ Group = 0x10000, Path = "~/Content/Scripts/workCalendar.js", SearchParttern = null, SubFolder = false },

                new StaticResource(){ Group = 0x00110, Path = "~/App/_form", SearchParttern = "*.js", SubFolder = true ,IsIncludeDirectory=true},
                new StaticResource(){ Group = 0x00100, Path = "~/App/SysDesigner/app.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00100, Path = "~/App/SysDesigner", SearchParttern = "*.js", SubFolder = true ,IsIncludeDirectory=true },


                new StaticResource(){ Group = 0x00001, Path = "~/Content/Lib/amcharts3/plugins/export/export.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00001, Path = "~/Content/Lib/amcharts3/plugins/export/libs/fabric.js/fabric.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00001, Path = "~/Content/Lib/amcharts3/plugins/export/libs/jszip/jszip.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00001, Path = "~/Content/Lib/amcharts3/plugins/export/libs/xlsx/xlsx.js", SearchParttern = null, SubFolder = false },
                new StaticResource(){ Group = 0x00001, Path = "~/Content/Lib/amcharts3/exporting", SearchParttern ="*.js", SubFolder = true , IsIncludeDirectory = true},
                
                //new StaticResource(){ Group = 0x0000, Path = "", SearchParttern = null, SubFolder = false },
            };
                List<StaticResource> css_Sources = new List<StaticResource>()
            {
                //zui-1.8.1 component start
                new StaticResource(){ Group = 0x10000, Path = "~/Content/Lib/zui-1.8.1/css/zui.min.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true  },
                new StaticResource(){ Group = 0x10100, Path = "~/Content/Lib/zui-1.8.1/css/zui-theme.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true  },

                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/zui/css/zui.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/zui/css/zui-theme.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/jquery-1.11.3/jquery-ui.min.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },

                new StaticResource(){ Group = 0x11000, Path = "~/Content/Style/custom-icon.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },

                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/component/codeprettify/css/prettify.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=false },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/component/codeprettify/css/atelier-dune-light.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=false },

                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/zui/lib/datatable/zui.datatable.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/zui/lib/datetimepicker/datetimepicker.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },

                new StaticResource(){ Group = 0x10000, Path = "~/Content/Lib/zui-1.8.1/lib/datatable/zui.datatable.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x10000, Path = "~/Content/Lib/zui-1.8.1/lib/datetimepicker/datetimepicker.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x00010, Path = "~/App/_shared/shared_mobile.min.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=false },

                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/angularjs/angular-strap/angular-strap.min.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x11010, Path = "~/Content/Lib/pnotify/pnotify.custom.min.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x11110, Path = "~/Content/Lib/component/tooltip/tooltip.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x00100, Path = "~/Content/Lib/component/noslider/nouislider.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x00010, Path = "~/Content/Lib_mobile/ionic/css/ionic.min.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },



                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/component/jstree/themes/default/style.min.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x01100, Path = "~/Content/Lib/component/select2/select2.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },

                new StaticResource(){ Group = 0x00100, Path = "~/Content/Lib/zui-1.8.1/css/zui.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },

                new StaticResource(){ Group = 0x00100, Path = "~/Content/Lib/des-lib/des/css/wfd.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x00100, Path = "~/App/SysDesigner/Global", SearchParttern = "*.css", SubFolder = true, IsCssRewriteUrlTransform=false,IsIncludeDirectory=true },



                new StaticResource(){ Group = 0x01000, Path = "~/Content/Lib/trNgGrid/trNgGrid.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x01000, Path = "~/App/SysPages/Global/app.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x11100, Path = "~/Content/Lib/miniabp/framework", SearchParttern = "*.css", SubFolder = true, IsCssRewriteUrlTransform=false,IsIncludeDirectory=true },
               
               //共享相关
               new StaticResource(){ Group = 0x11100, Path = "~/App/_shared/shared.min.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=false },
               new StaticResource(){ Group = 0x11000, Path = "~/App/SysPages", SearchParttern = "*.css", SubFolder = true, IsCssRewriteUrlTransform=false,IsIncludeDirectory=true },
                   
               //jqgrid
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/JQGrid/css/css/redmond/jquery-ui-1.8.16.custom.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/JQGrid/css/ui.jqgrid.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },

               //设计器相关
                new StaticResource(){ Group = 0x11000, Path = "~/App/SysPages/Global", SearchParttern = "*.css", SubFolder = true, IsCssRewriteUrlTransform=false,IsIncludeDirectory=true },
               //图表相关
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/amcharts3/plugins/export/export.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                //组织树相关css
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/org-tree/orgChart.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x11000, Path = "~/Content/Lib/smartMenu/smartMenu.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },

                new StaticResource(){ Group = 0x01000, Path = "~/Content/Style/bpm_2.0.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },
                new StaticResource(){ Group = 0x11000, Path = "~/AppPages/Css/DefaultPage.css", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },



                
                // new StaticResource(){ Group = 0x0000, Path = "", SearchParttern = null, SubFolder = false, IsCssRewriteUrlTransform=true },

            };
                // 0x10000
                var layoutCss = new StyleBundle("~/Layout/Css") { Orderer = new AsIsBundleOrderer() };
                var layoutJs = new ScriptBundle("~/layout/js") { Orderer = new AsIsBundleOrderer() };

                // 0x01000
                var syspageCss = new StyleBundle("~/syspages/Css") { Orderer = new AsIsBundleOrderer() };
                var syspageJs = new ScriptBundle("~/syspages/js") { Orderer = new AsIsBundleOrderer() };

                // 0x00100
                var designerCss = new StyleBundle("~/SysDesinger/Css") { Orderer = new AsIsBundleOrderer() };
                var designerJs = new ScriptBundle("~/SysDesinger/js") { Orderer = new AsIsBundleOrderer() };

                // 0x00010
                var mobilePageCss = new StyleBundle("~/MobilePages/Css") { Orderer = new AsIsBundleOrderer() };
                var mobileJs = new ScriptBundle("~/MobilePages/Js") { Orderer = new AsIsBundleOrderer() };

                // 0x00001
                var amchartsJs = new ScriptBundle("~/Bundles/App/Global/js/amcharts") { Orderer = new AsIsBundleOrderer() };

                IncludeCss(layoutCss, css_Sources, 0x10000);
                IncludeJs(layoutJs, js_Sources, 0x10000);

                IncludeCss(syspageCss, css_Sources, 0x01000);
                IncludeJs(syspageJs, js_Sources, 0x01000);

                IncludeCss(designerCss, css_Sources, 0x00100);
                IncludeJs(designerJs, js_Sources, 0x00100);

                IncludeCss(mobilePageCss, css_Sources, 0x00010);
                IncludeJs(mobileJs, js_Sources, 0x00010);

                IncludeJs(amchartsJs, js_Sources, 0x00001);


                bundles.Add(layoutCss);
                bundles.Add(layoutJs);

                bundles.Add(syspageCss);
                bundles.Add(syspageJs);


                bundles.Add(designerJs);
                bundles.Add(designerCss);


                bundles.Add(mobilePageCss);
                bundles.Add(mobileJs);

                bundles.Add(amchartsJs);


            }

            private static void IncludeCss(StyleBundle bundle, List<StaticResource> resource, int where)
            {
                var list = resource.Where(r => (r.Group & where) == where).ToList();
                var list2 = resource.Where(r => (r.Group & where) == where).Select(r => r.Path).ToList();
                list.ForEach(r =>
                {
                    if (r.IsIncludeDirectory)
                    {
                        bundle.IncludeDirectory(r.Path, r.SearchParttern, r.SubFolder);
                    }
                    else
                    {
                        if (r.IsCssRewriteUrlTransform)
                        {
                            bundle.Include(r.Path, new CssRewriteUrlTransform());
                        }
                        else
                        {
                            bundle.Include(r.Path);
                        }
                    }
                });
            }
            private static void IncludeJs(ScriptBundle bundle, List<StaticResource> resource, int where)
            {

                var list = resource.Where(r => (r.Group & where) == where).ToList();
                list.ForEach(r =>
                {
                    if (r.IsIncludeDirectory)
                    {
                        bundle.IncludeDirectory(r.Path, r.SearchParttern, r.SubFolder);
                    }
                    else
                    {
                        bundle.Include(r.Path);
                    }
                });
            }
            /// <summary>
            /// 按顺序加载
            /// </summary>
            public sealed class AsIsBundleOrderer : IBundleOrderer
            {
                public IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
                {
                    return files;
                }
            }
        }

        public class StaticResource
        {
            public string Path { get; set; }
            public string SearchParttern { get; set; }
            public bool SubFolder { get; set; }

            /// <summary>
            /// css特有
            /// </summary>
            public bool IsCssRewriteUrlTransform { get; set; } = false;

            /// <summary>
            /// 是否包含文件夾
            /// </summary>
            public bool IsIncludeDirectory { get; set; } = false;


            /// <summary>
            /// 分组 
            /// </summary>
            public int Group { get; set; } = 0x10100;
        }
    }