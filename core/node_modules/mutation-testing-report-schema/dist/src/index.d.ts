export * from '../src-generated/schema';
export declare const schema: {
    $schema: string;
    $id: string;
    title: string;
    description: string;
    type: string;
    required: string[];
    properties: {
        config: {
            description: string;
            type: string;
        };
        schemaVersion: {
            type: string;
            pattern: string;
            description: string;
            examples: string[];
        };
        files: {
            type: string;
            title: string;
            description: string;
            additionalProperties: {
                type: string;
                title: string;
                description: string;
                required: string[];
                properties: {
                    language: {
                        description: string;
                        examples: string[];
                        type: string;
                    };
                    mutants: {
                        type: string;
                        uniqueItems: boolean;
                        items: {
                            type: string;
                            title: string;
                            description: string;
                            required: string[];
                            properties: {
                                coveredBy: {
                                    type: string;
                                    description: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                description: {
                                    type: string;
                                    description: string;
                                    examples: string[];
                                };
                                duration: {
                                    type: string;
                                    description: string;
                                };
                                id: {
                                    type: string;
                                    description: string;
                                    examples: string[];
                                };
                                killedBy: {
                                    type: string;
                                    description: string;
                                    items: {
                                        type: string;
                                    };
                                };
                                location: {
                                    $ref: string;
                                };
                                mutatorName: {
                                    type: string;
                                    description: string;
                                    examples: string[];
                                };
                                replacement: {
                                    type: string;
                                    description: string;
                                    examples: string[];
                                };
                                static: {
                                    type: string;
                                    description: string;
                                };
                                status: {
                                    type: string;
                                    title: string;
                                    description: string;
                                    enum: string[];
                                };
                                statusReason: {
                                    type: string;
                                    description: string;
                                };
                                testsCompleted: {
                                    type: string;
                                    description: string;
                                };
                            };
                        };
                    };
                    source: {
                        description: string;
                        examples: string[];
                        type: string;
                    };
                };
            };
        };
        testFiles: {
            type: string;
            title: string;
            description: string;
            additionalProperties: {
                type: string;
                title: string;
                description: string;
                required: string[];
                properties: {
                    source: {
                        description: string;
                        type: string;
                    };
                    tests: {
                        type: string;
                        items: {
                            type: string;
                            title: string;
                            required: string[];
                            description: string;
                            properties: {
                                id: {
                                    type: string;
                                    description: string;
                                };
                                name: {
                                    type: string;
                                    description: string;
                                };
                                location: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        thresholds: {
            type: string;
            title: string;
            description: string;
            required: string[];
            properties: {
                high: {
                    type: string;
                    description: string;
                    minimum: number;
                    maximum: number;
                    examples: number[];
                };
                low: {
                    type: string;
                    description: string;
                    minimum: number;
                    maximum: number;
                    examples: number[];
                };
            };
        };
        projectRoot: {
            type: string;
            description: string;
            examples: string[];
        };
        performance: {
            type: string;
            title: string;
            description: string;
            required: string[];
            properties: {
                setup: {
                    type: string;
                    description: string;
                };
                initialRun: {
                    type: string;
                    description: string;
                };
                mutation: {
                    type: string;
                    description: string;
                };
            };
        };
        framework: {
            type: string;
            title: string;
            description: string;
            required: string[];
            properties: {
                name: {
                    type: string;
                    description: string;
                    examples: string[];
                };
                version: {
                    type: string;
                    description: string;
                };
                branding: {
                    type: string;
                    title: string;
                    description: string;
                    required: string[];
                    properties: {
                        homepageUrl: {
                            type: string;
                            format: string;
                            description: string;
                        };
                        imageUrl: {
                            type: string;
                            description: string;
                        };
                    };
                };
                dependencies: {
                    type: string;
                    title: string;
                    description: string;
                    additionalProperties: {
                        type: string;
                    };
                };
            };
        };
        system: {
            type: string;
            title: string;
            description: string;
            required: string[];
            properties: {
                ci: {
                    description: string;
                    type: string;
                };
                os: {
                    type: string;
                    title: string;
                    required: string[];
                    properties: {
                        description: {
                            type: string;
                            description: string;
                            examples: string[];
                        };
                        platform: {
                            type: string;
                            description: string;
                            examples: string[];
                        };
                        version: {
                            type: string;
                            description: string;
                            examples: string[];
                        };
                    };
                };
                cpu: {
                    type: string;
                    title: string;
                    required: string[];
                    properties: {
                        baseClock: {
                            type: string;
                            description: string;
                        };
                        logicalCores: {
                            type: string;
                        };
                        model: {
                            type: string;
                            examples: string[];
                        };
                    };
                };
                ram: {
                    title: string;
                    type: string;
                    required: string[];
                    properties: {
                        total: {
                            type: string;
                            description: string;
                        };
                    };
                };
            };
        };
    };
    definitions: {
        position: {
            type: string;
            title: string;
            description: string;
            required: string[];
            properties: {
                line: {
                    type: string;
                    minimum: number;
                    examples: number[];
                };
                column: {
                    type: string;
                    minimum: number;
                    examples: number[];
                };
            };
        };
        location: {
            type: string;
            title: string;
            description: string;
            required: string[];
            properties: {
                start: {
                    $ref: string;
                };
                end: {
                    $ref: string;
                };
            };
        };
        openEndLocation: {
            type: string;
            title: string;
            description: string;
            required: string[];
            properties: {
                start: {
                    $ref: string;
                };
                end: {
                    $ref: string;
                };
            };
        };
    };
};
//# sourceMappingURL=index.d.ts.map