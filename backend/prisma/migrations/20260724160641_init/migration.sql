-- CreateTable
CREATE TABLE "public"."challan_items" (
    "id" SERIAL NOT NULL,
    "challan_id" INTEGER,
    "product_id" INTEGER,
    "product_name" VARCHAR(100),
    "unit_price" DECIMAL(10,2),
    "quantity" INTEGER,

    CONSTRAINT "challan_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."challans" (
    "id" SERIAL NOT NULL,
    "challan_number" VARCHAR(50),
    "customer_id" INTEGER,
    "total_quantity" INTEGER,
    "status" VARCHAR(20),
    "created_by" INTEGER,
    "created_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" SERIAL NOT NULL,
    "customer_name" VARCHAR(100),
    "mobile" VARCHAR(15),
    "email" VARCHAR(100),
    "business_name" VARCHAR(100),
    "gst_number" VARCHAR(20),
    "customer_type" VARCHAR(30),
    "address" TEXT,
    "status" VARCHAR(20),
    "follow_up_date" DATE,
    "notes" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" SERIAL NOT NULL,
    "product_name" VARCHAR(100),
    "sku" VARCHAR(50),
    "category" VARCHAR(100),
    "unit_price" DECIMAL(10,2),
    "current_stock" INTEGER,
    "minimum_stock" INTEGER,
    "warehouse" VARCHAR(100),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stock_movements" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "quantity_changed" INTEGER,
    "movement_type" VARCHAR(10),
    "reason" TEXT,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(20) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "challans_challan_number_key" ON "public"."challans"("challan_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."challan_items" ADD CONSTRAINT "challan_items_challan_id_fkey" FOREIGN KEY ("challan_id") REFERENCES "public"."challans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."challan_items" ADD CONSTRAINT "challan_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."challans" ADD CONSTRAINT "challans_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."challans" ADD CONSTRAINT "challans_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."stock_movements" ADD CONSTRAINT "stock_movements_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."stock_movements" ADD CONSTRAINT "stock_movements_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
