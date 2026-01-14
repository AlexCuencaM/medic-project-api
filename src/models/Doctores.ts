export class    Doctores {
  constructor(
    public readonly id: number,
    public nombre: string,
    public apellido: string,
    public especialidad: string,
    public telefono?: string,
    public email?: string
  ) {}
}
