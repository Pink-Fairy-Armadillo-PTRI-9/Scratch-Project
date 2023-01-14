CREATE TABLE "landlords" (
  "_id" SERIAL NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "location" VARCHAR(255) NOT NULL,
  CONSTRAINT "landlords_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
​
CREATE TABLE "properties" (
  "_id" SERIAL NOT NULL,
  "landlord_id" BIGINT NOT NULL,
  "address" VARCHAR(255) NOT NULL,
  "city" VARCHAR(255) NOT NULL,
  "zip" INTEGER,
  CONSTRAINT "properties_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
​
CREATE TABLE "reviews" (
  "_id" SERIAL NOT NULL,
  "landlord_id" BIGINT NOT NULL,
  "text" VARCHAR(255),
  "rating" INTEGER NOT NULL,
  "would_rent_again" INTEGER NOT NULL,
  "date" VARCHAR(255) NOT NULL,
  "user_id" BIGINT NOT NULL,
  CONSTRAINT "reviews_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
​
CREATE TABLE "users" (
  "_id" SERIAL NOT NULL,
  "username" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
​
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("_id");
​
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_landlord_id_foreign" FOREIGN KEY ("landlord_id") REFERENCES "landlords" ("_id");
​
ALTER TABLE "properties" ADD CONSTRAINT "properties_landlord_id_foreign" FOREIGN KEY ("landlord_id") REFERENCES "landlords" ("_id");

INSERT INTO landlords VALUES (1, 'Dummy Landlord1','somewhere1')
INSERT INTO landlords VALUES (2, 'Dummy Landlord2','somewhere2')
INSERT INTO landlords VALUES (3, 'Dummy Landlord3','somewhere3')
INSERT INTO landlords VALUES (4, 'Dummy Landlord4','somewhere4')
INSERT INTO landlords VALUES (5, 'Dummy Landlord5','somewhere5')
