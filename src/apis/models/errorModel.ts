export interface APIErrorResponse {
  result: {
    description: string;
    status: number;
    message: string;
  };
  status: number;
  message: string;
  code: number;
  fieldErrors?: FieldError[];
  violationErrors?: ConstraintViolationError[];
}

interface FieldError {
  field: string;
  rejectedValue: unknown;
  reason: string;
}

interface ConstraintViolationError {
  propertyPath: string; // 위반된 속성 경로
  rejectedValue: unknown; // 거부된 값
  reason: string; // 에러 이유
}
