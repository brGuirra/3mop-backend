export abstract class DeleteContactUseCase {
  abstract execute(id: string): Promise<void>;
}
