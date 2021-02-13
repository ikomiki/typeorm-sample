import { ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
      SELECT "post"."id" AS "id", "post"."title" AS "title", "category"."description" AS "categoryDescription"
      FROM "post" "post"
      LEFT JOIN "category" "category" ON "post"."categoryId" = "category"."id"
  `,
})
export class View {}
