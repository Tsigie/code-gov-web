import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth} from 'angular2-jwt';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './components/app';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { DocsComponent } from './components/policy-guide/docs';
import { HomeComponent } from './components/home';
import {
  IntroductionComponent
} from './components/policy-guide/docs/overview/introduction';
import { OverviewComponent } from './components/policy-guide/docs/overview';
import {
  OverviewInventoryComponent
} from './components/policy-guide/docs/overview/overview-inventory';
import {
  OverviewPilotComponent
} from './components/policy-guide/docs/overview/overview-pilot';
import { PolicyGuideComponent } from './components/policy-guide';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  declarations: [
    AppComponent,
    DocsComponent,
    HomeComponent,
    IntroductionComponent,
    OverviewComponent,
    OverviewInventoryComponent,
    OverviewPilotComponent,
    PolicyGuideComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    APP_PROVIDERS
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrOnInit(store) {
    console.log('HMR store', store);
  }
}
