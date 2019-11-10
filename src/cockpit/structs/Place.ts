/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/place.struct.wings
 */

import { IWingsStruct } from 'wings-ts-util';

// Place - One of many location for a Day (in a Trip).
export default class Place implements IWingsStruct {
    [key: string]: any;
    public ID: number = -1;
    public label: string = '';
    public URL: string = '';
    public description: string = '';

    public init(data: any): boolean {
        try {
            this.ID = data.id;
            this.label = data.label;
            this.URL = data.url;
            this.description = data.description;
        } catch (e) {
            return false;
        }
        return true;
    }

    public toJsonKey(key: string): string {
        switch (key) {
            case 'ID': {
                return 'id';
            }
            case 'label': {
                return 'label';
            }
            case 'URL': {
                return 'url';
            }
            case 'description': {
                return 'description';
            }
            default: {
                return key;
            }
        }
    }
}
