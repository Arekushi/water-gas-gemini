-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measure" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "measure_type_id" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "measurement_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measure_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measure_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measure_type_name_key" ON "measure_type"("name");

-- AddForeignKey
ALTER TABLE "measure" ADD CONSTRAINT "measure_measure_type_id_fkey" FOREIGN KEY ("measure_type_id") REFERENCES "measure_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measure" ADD CONSTRAINT "measure_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
