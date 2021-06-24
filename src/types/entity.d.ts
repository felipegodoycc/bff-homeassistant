export interface HAEntity<T> {
    entity_id: string;
    state: string;
    attributes: T;
    last_changed: Date;
    last_updated: Date;
    context: {
        id: string;
        parent_id: string;
        user_id: string;
    }
}

export class BaseAttributes {
    friendly_name: string;
    icon?: string;
    editable?: boolean;
}

export class HAPersonAttributes extends BaseAttributes {
    id: string;
    latitude: number;
    longitude: number;
    gps_accuracy: number;
    source: string;
    user_id: string;
}

export class HASensorAttributes extends BaseAttributes  {
    unit_of_measurement: string;
    device_class: string;
    state?: string;
}

export class HAZoneAttributes extends BaseAttributes {
    latitude: number
    longitude: number
    radius: number
    passive: boolean
}

export class HATrackerAttributes extends BaseAttributes {
    source_type: string;
    latitude: number;
    longitude: number;
    gps_accuracy: number
    altitude: number
    course: number
    speed: number
    vertical_accuracy: number 
}

export interface SimplePoint {
    latitude: string,
    longitude: string,
    timestamp: string,
    status: string
}