interface ITemplate {
  Payload: {
    Id: string;
    Name: string;
    Version: string;
    Content: string;
  }[];
  Metadata: {
    Timestamp: string;
    CorrelationId: string;
    ProcessedBy: string;
  };
}

export type { ITemplate };
