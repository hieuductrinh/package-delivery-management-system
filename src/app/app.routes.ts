import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StatsComponent } from './stats/stats.component';
import { AuthGuard } from './auth.guard';
import { Auth } from 'firebase-admin/auth';
import { TranslationComponent } from './translation/translation.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { GenaiComponent } from './genai/genai.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "add-driver",
        component: AddDriverComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "list-drivers",
        component: ListDriversComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "delete-driver",
        component: DeleteDriverComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "update-driver",
        component: UpdateDriverComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "add-package",
        component: AddPackageComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "list-packages",
        component: ListPackagesComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "delete-package",
        component: DeletePackageComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "update-package",
        component: UpdatePackageComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "invalid",
        component: InvalidDataComponent
    },
    {
        path: "login",
        component: LogInComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "stats",
        component: StatsComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "translation",
        component: TranslationComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "tts",
        component: TextToSpeechComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "genai",
        component: GenaiComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];
