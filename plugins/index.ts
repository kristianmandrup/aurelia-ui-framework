/**
 *    UI Framework Plugins
 *    @author    Adarsh Pastakia
 *    @company    HMC
 *    @copyright 2015-2016, Adarsh Pastakia
 **/
import {FrameworkConfiguration} from "aurelia-framework";

export function configure(aurelia:FrameworkConfiguration) {
	aurelia.globalResources('./core/ui-app');
	aurelia.globalResources('./core/ui-page');
	aurelia.globalResources('./core/ui-section');
	aurelia.globalResources('./core/ui-content');
	aurelia.globalResources('./core/ui-header');
	aurelia.globalResources('./core/ui-sidebar');
	aurelia.globalResources('./core/ui-toolbar');
	aurelia.globalResources('./core/ui-statsbar');

	aurelia.globalResources('./containers/ui-button-group');
	aurelia.globalResources('./containers/ui-grid-column');
	aurelia.globalResources('./containers/ui-grid');
	aurelia.globalResources('./containers/ui-menu');

	aurelia.globalResources('./components/ui-button');
	aurelia.globalResources('./components/ui-switch');
}