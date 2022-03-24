import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { Case } from 'src/models/sitrepCase';
import { CaseLog } from 'src/models/CaseLog';

@Component({
  selector: 'app-user-tab-edit',
  templateUrl: './user-tab-edit.page.html',
  styleUrls: ['./user-tab-edit.page.scss'],
})
export class UserTabEditPage implements OnInit {
  
  case: Case
  
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private apiService: ApiService,
    public alertController: AlertController,
    private toastService: ToastService) {
  }

  async ngOnInit() {
    let caseId = this.route.snapshot.paramMap.get('id'); //Get id from the route params

    //Gets cases from api with filter option
    await this.apiService.getCase(caseId)
    .subscribe((item: Case) => {
      this.case = item;

        //Get logs associated with that case
        let getLogsLink = this.case.links.find(link => link.rel == 'get_logs_for_case')
        if (getLogsLink.href != null){
          this.apiService.commonRequest(getLogsLink.method, getLogsLink.href)
          .subscribe((logs: CaseLog[]) => {
            this.case.Logs = logs
          })
        }

    }, async (error) => {
      await this.toastService.presentNegativeMessage("Fejl, kunne ikke hente sag");
      this.router.navigateByUrl('/app', { replaceUrl: true });
    })
  }

}
