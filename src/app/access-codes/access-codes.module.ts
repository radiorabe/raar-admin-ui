import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AccessCodesRoutingModule } from "./access-codes-routing.module";
import { AccessCodesComponent } from "./components/access-codes.component";
import { AccessCodesInitComponent } from "./components/access-codes-init.component";
import { AccessCodeFormComponent } from "./components/access-code-form.component";
import { AccessCodesService } from "./services/access-codes.service";
import { AccessCodesRestService } from "./services/access-codes-rest.service";

@NgModule({
  imports: [SharedModule, AccessCodesRoutingModule],
  declarations: [
    AccessCodesComponent,
    AccessCodesInitComponent,
    AccessCodeFormComponent,
  ],
  exports: [],
  providers: [AccessCodesRestService, AccessCodesService],
})
export class AccessCodesModule {}
