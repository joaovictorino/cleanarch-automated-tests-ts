/// <reference types="node" />
/// <reference types="node" />
import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { Readable } from "stream";
export declare class WorldParameters<T = any> {
    readonly value: T;
    constructor(value: T);
}
export declare class CucumberLog {
    private readonly target;
    constructor(target: ICreateLog);
    log(text: string): void | Promise<void>;
}
export declare class CucumberAttachments {
    private readonly target;
    constructor(target: ICreateAttachment);
    attach(data: string, mediaType?: string): void;
    attach(data: Buffer, mediaType: string): void;
    attach(data: Readable, mediaType: string): Promise<void>;
    attach(data: Readable, mediaType: string, callback: () => void): void;
}
//# sourceMappingURL=provided-context.d.ts.map