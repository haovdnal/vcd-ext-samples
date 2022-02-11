/*
 * Copyright 2018 VMware, Inc. All rights reserved. VMware Confidential
 */
import {Component, Inject} from "@angular/core";
import {EXTENSION_ASSET_URL} from '@vcd/sdk/common';

@Component({
    selector: "vcd-plugin-about",
    template: `
        <div>
            <p>content 1</p>
            <p>content 2</p>
        </div>
    `
})
export class AboutComponent {
    constructor(@Inject(EXTENSION_ASSET_URL) public assetUrl: string) {}
}
