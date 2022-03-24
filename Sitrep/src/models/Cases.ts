import { Case } from "./sitrepCase";
import { CaseLink } from "./CaseLink";

//Interface for Cases
export interface Cases {
    value: Case[],
    links: CaseLink[]
}
