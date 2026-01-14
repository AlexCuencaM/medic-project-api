-- CreateTable
CREATE TABLE "Doctores" (
    "ID_Doctor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Especialidad" TEXT NOT NULL,
    "Teléfono" TEXT,
    "Email" TEXT
);

-- CreateTable
CREATE TABLE "Pacientes" (
    "ID_Paciente" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Fecha_de_Nacimiento" DATETIME NOT NULL,
    "Dirección" TEXT NOT NULL,
    "Teléfono" TEXT,
    "Email" TEXT
);

-- CreateTable
CREATE TABLE "Camas" (
    "ID_Cama" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Número_de_Cama" INTEGER NOT NULL,
    "Tipo_de_Cama" TEXT NOT NULL,
    "Estado" TEXT NOT NULL,
    "ID_Paciente" INTEGER,
    CONSTRAINT "Camas_ID_Paciente_fkey" FOREIGN KEY ("ID_Paciente") REFERENCES "Pacientes" ("ID_Paciente") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Servicios_Médicos" (
    "ID_Servicio" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre_del_Servicio" TEXT NOT NULL,
    "Descripción" TEXT,
    "Costo" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Ingresos" (
    "ID_Ingreso" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ID_Paciente" INTEGER NOT NULL,
    "ID_Doctor" INTEGER NOT NULL,
    "Fecha_de_Ingreso" DATETIME NOT NULL,
    "Fecha_de_Egreso" DATETIME,
    "Diagnóstico" TEXT NOT NULL,
    CONSTRAINT "Ingresos_ID_Paciente_fkey" FOREIGN KEY ("ID_Paciente") REFERENCES "Pacientes" ("ID_Paciente") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingresos_ID_Doctor_fkey" FOREIGN KEY ("ID_Doctor") REFERENCES "Doctores" ("ID_Doctor") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tratamientos" (
    "ID_Tratamiento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ID_Ingreso" INTEGER NOT NULL,
    "ID_Servicio" INTEGER NOT NULL,
    "Fecha_de_Tratamiento" DATETIME NOT NULL,
    "Descripción" TEXT,
    CONSTRAINT "Tratamientos_ID_Ingreso_fkey" FOREIGN KEY ("ID_Ingreso") REFERENCES "Ingresos" ("ID_Ingreso") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Tratamientos_ID_Servicio_fkey" FOREIGN KEY ("ID_Servicio") REFERENCES "Servicios_Médicos" ("ID_Servicio") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctores_Email_key" ON "Doctores"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Pacientes_Email_key" ON "Pacientes"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Camas_Número_de_Cama_key" ON "Camas"("Número_de_Cama");

-- CreateIndex
CREATE UNIQUE INDEX "Camas_ID_Paciente_key" ON "Camas"("ID_Paciente");

-- CreateIndex
CREATE INDEX "Ingresos_ID_Paciente_idx" ON "Ingresos"("ID_Paciente");

-- CreateIndex
CREATE INDEX "Ingresos_ID_Doctor_idx" ON "Ingresos"("ID_Doctor");

-- CreateIndex
CREATE INDEX "Tratamientos_ID_Ingreso_idx" ON "Tratamientos"("ID_Ingreso");

-- CreateIndex
CREATE INDEX "Tratamientos_ID_Servicio_idx" ON "Tratamientos"("ID_Servicio");
