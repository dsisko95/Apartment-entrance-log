import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
import { MzSidenavModule } from 'ng2-materialize';
import { MzIconModule, MzIconMdiModule } from 'ng2-materialize';
import { MzDropdownModule } from 'ng2-materialize';
import { MzSelectModule } from 'ng2-materialize';
import { MzProgressModule } from 'ng2-materialize';
import { MzRadioButtonModule } from 'ng2-materialize';
import { MzDatepickerModule } from 'ng2-materialize';
import { MzSwitchModule } from 'ng2-materialize';
import { MzCardModule } from 'ng2-materialize';
import { MzInputModule } from 'ng2-materialize';
import { MzTooltipModule } from 'ng2-materialize';
import { MzModalModule } from 'ng2-materialize';
import { MzCollapsibleModule } from 'ng2-materialize';
import { MzButtonModule } from 'ng2-materialize';
import { MzTabModule } from 'ng2-materialize';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    declarations: [],
    imports: [ ],
    exports: [
        NgxPaginationModule,
        NgPipesModule,
        MzSidenavModule,
        MzIconModule,
        MzIconMdiModule,
        MzDropdownModule,
        MzSelectModule,
        MzProgressModule,
        MzRadioButtonModule,
        MzDatepickerModule,
        MzSwitchModule,
        MzCardModule,
        MzInputModule,
        MzTooltipModule,
        MzModalModule,
        MzCollapsibleModule,
        MzButtonModule,
        MzTabModule,
        Ng2OrderModule,
        NgxSpinnerModule,
    ],
    providers: [],
})
export class MaterializeModule {}