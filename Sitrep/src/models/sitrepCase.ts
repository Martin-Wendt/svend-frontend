import { CaseImage } from "./CaseImage";
import { CaseLink } from "./CaseLink";
import { CaseLog } from "./CaseLog";
import { CaseUser } from "./CaseUser";

//Interface for Case
export interface Case {
    CaseId: number,
    UserId: string,
    Title: string,
    Location: string,
    Description: string,
    PriorityId: number,
    PriorityName: string,
    StatusId: number,
    StatusName: string,
    ImageCount: number,
    LogCount: number,
    CreatedBy: CaseUser,
    Logs: CaseLog[],
    links: CaseLink[],
    CreatedAt: string,
    AssigneeId: string,
    CaseImages: CaseImage[],
    Assignee: CaseUser
}