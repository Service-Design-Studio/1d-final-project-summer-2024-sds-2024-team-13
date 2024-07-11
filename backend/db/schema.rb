# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_11_012140) do
  create_table "customers", primary_key: "customer_id", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "phone_num"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
<<<<<<< HEAD
    t.string "payee_id"
    t.string "payee_number"
=======
    t.string "customer_number"
>>>>>>> fe0841ec6446e9dbe93e259b5d42c72537d443cf
    t.string "payment_method"
    t.decimal "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_id"
    t.string "transaction_id"
    t.string "customer_id"
    t.string "transaction_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "phone_num"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_id"
    t.string "email"
    t.string "password_digest"
    t.time "earnings_cutoff_time"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["user_id"], name: "index_users_on_user_id", unique: true
  end

  add_foreign_key "transactions", "customers", primary_key: "customer_id"
end
