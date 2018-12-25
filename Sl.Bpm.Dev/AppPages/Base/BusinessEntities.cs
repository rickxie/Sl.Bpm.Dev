/*===================================================
 * 类名称: BusinessEntities
 * 文件名: \Base\BusinessEntities
 * 类描述: 常用表实体对象
 * 创建人: Zhangsheng.Hu
 * 创建时间: 2018-12-25 13:07:15
 * 修改人: 
 * 修改时间:
 * 版本： @version 1.0
 *===================================================*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sl.Bpm.Client.AppPages.Base
{

    public class t_ticket
    {
        public string Id { get; set; }
        public string TripId { get; set; }
        public DateTime? DepartureTime { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Type { get; set; }
        public string TrainOrFlightNo { get; set; }
        public string Passenger { get; set; }
        public string Telephone { get; set; }
        public string Status { get; set; }
        public string Price { get; set; }
        public string ProjectId { get; set; }
        public int? CcId { get; set; }
        public string TicketNo { get; set; }
        public string AssociatedTicketNo { get; set; }
        public int? RecordStatus { get; set; }
        public string Note { get; set; }
        public string PassengerUserId { get; set; }
        public string AdmSn { get; set; }
    }

    public class t_ticket_hotel
    {
        public string Id { get; set; }
        public int? TripNo { get; set; }
        public string Hotel { get; set; }
        public string CreatorUserId { get; set; }
        public string GuestName { get; set; }
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public string Telephone { get; set; }
        public string Price { get; set; }
        public string ProjectId { get; set; }
        public string CcId { get; set; }
        public string City { get; set; }
        public string RoomType { get; set; }
        public int? RecordStatus { get; set; }
        public string Note { get; set; }
        public string AppliacationUser { get; set; }
    }


    public class t_project
    {
        public string Id { get; set; }
        public string ProjectNo { get; set; }
        public string ProjectCnName { get; set; }
        public string ProjectEnName { get; set; }
        public string ClientNo { get; set; }
        public string ClientName { get; set; }
        public string ClientContact { get; set; }
        public string PhoneNo { get; set; }
        public int? StaffNo { get; set; }

        public float? EstimatedAmount { get; set; }
        public string CcNo { get; set; }
        public string CcName { get; set; }
        public string CcOwner { get; set; }
        public string CcOwnerId { get; set; }
        public string WorkCity { get; set; }
        public string BuNo { get; set; }
        public string BuName { get; set; }
        public string BuOwnerName { get; set; }
        public string BuOwnerId { get; set; }
        public string PmId { get; set; }
        public string PmName { get; set; }
        public string PmContact { get; set; }
        public string SalesId { get; set; }
        public string SalesName { get; set; }
        public string SalesContact { get; set; }
        public string EntityId { get; set; }
        public string EntityName { get; set; }
        public int? BusinessType { get; set; }
        public int? ProjectType { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int? SettlementType { get; set; }
        public string OfficeAddress { get; set; }
        public string OfficeId { get; set; }
        public string City { get; set; }
        public int? Status { get; set; }
        public int? FinanceStatus { get; set; }
        public string ProjectExplain { get; set; }
        public DateTime? ProjectApprovalTime { get; set; }
        public string PartnersName { get; set; }
        public string PartnersId { get; set; }
    }


    public class t_staff
    {
        public string Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Initial { get; set; }
        public string EnName { get; set; }
        public string Alias { get; set; }
        public string CnName { get; set; }
        public string IdType { get; set; }
        public string Nationality { get; set; }
        public string Residence { get; set; }
        public string Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public string IdNo { get; set; }
        public string PoliticalStatus { get; set; }
        public string Married { get; set; }
        public string HaveKids { get; set; }
        public DateTime? PassportExpDate { get; set; }
        public DateTime? ResPermitExpDate { get; set; }
        public DateTime? EmpCertExpDate { get; set; }
        public string EmployeeNo { get; set; }
        public string OldEmpNo { get; set; }
        public string PhotoPath { get; set; }
        public string PhoneNo { get; set; }
        public string ContactAddr { get; set; }
        public string PermanentAddr { get; set; }
        public string WeChat { get; set; }
        public string Qq { get; set; }
        public string EmerContact1 { get; set; }
        public string EmerRelation1 { get; set; }
        public string EmerPhone1 { get; set; }
        public string EmerContact2 { get; set; }
        public string EmerRelation2 { get; set; }
        public string EmerPhone2 { get; set; }
        public string PersonalEmai { get; set; }
        public string AppUserId { get; set; }
        public string WorkType { get; set; }
        public string CompanyEmail { get; set; }
        public string SeatNo { get; set; }
        public string BusinessPhone { get; set; }
        public string JobLevel { get; set; }
        public float? DailySalary { get; set; }

        public float? ProbationarySalary { get; set; }
        public float? RegularSalary { get; set; }
        public float? JobSalary { get; set; }
        public float? SkillSalary { get; set; }
        public float? RegularPerformance { get; set; }

        public DateTime? SalaryAdjustmentTime { get; set; }
        public float? CurrentJobSalary { get; set; }
        public float? CurrentSkillSalary { get; set; }
        public float? CurrentPerformance { get; set; }
        public float? CurrentTotalSalary { get; set; }

        public DateTime? LastSalaryUpdateTime { get; set; }
        public float? SubsidiaryStandard { get; set; }

        public string BankCardNo { get; set; }
        public string BankName { get; set; }
        public string ProvidentFundAccount { get; set; }
        public string PaymentCity { get; set; }
        public float? BaseSocialSecurityPay { get; set; }
        public float? BaseProvidentFundPay { get; set; }
        public float? SpecDucPersonIncTax { get; set; }

        public DateTime? EntryDate { get; set; }
        public DateTime? ProbationStartDate { get; set; }
        public DateTime? ProbationEndDate { get; set; }
        public int? SignedCount { get; set; }
        public string ContractType { get; set; }
        public DateTime? ContractStartTime { get; set; }
        public DateTime? ContractEndTime { get; set; }
        public string PartyA { get; set; }
        public string PartyB { get; set; }
        public DateTime? LeaveDate { get; set; }
        public string LeaveReason { get; set; }
        public string IsRehire { get; set; }
        public float? VacAnnualStandard { get; set; }
        public float? CurYearAddedAnnualVac { get; set; }
        public float? VacAnnualBalance { get; set; }
        public float? VacOtBalance { get; set; }

        public int? HisWorkMonths { get; set; }
        public string Status { get; set; }
        public bool? IsLaborManualSubmited { get; set; }
        public string OfferId { get; set; }
        public DateTime? AccountEffectiveTime { get; set; }
        public DateTime? AccountExpireTime { get; set; }
        public string ExtContract { get; set; }
        public string WorkCity { get; set; }
        public string ContractCity { get; set; }
        public string Extend1 { get; set; }
        public string Extend2 { get; set; }
        public string Extend3 { get; set; }
        public string Extend4 { get; set; }
        public string Extend5 { get; set; }
        public string Extend6 { get; set; }
    }


}