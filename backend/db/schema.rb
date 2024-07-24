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

ActiveRecord::Schema[7.1].define(version: 2024_07_24_195854) do
  create_table "customers", primary_key: "customer_id", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "phone_num"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "refund_requests", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "transaction_id"
    t.string "status"
    t.string "sender_id"
    t.string "sender_type"
    t.string "recipient_id"
    t.string "recipient_type"
    t.decimal "expect_amount", precision: 10, scale: 2
    t.decimal "refund_amount", precision: 10, scale: 2
    t.string "refund_request_id"
  end

  create_table "transactions", primary_key: "transaction_id", id: :string, force: :cascade do |t|
    t.string "customer_number"
    t.string "payment_method"
    t.decimal "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_id"
    t.string "customer_id"
    t.string "status"
    t.string "user_name"
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

  add_foreign_key "refund_requests", "transactions", primary_key: "transaction_id"
  add_foreign_key "transactions", "customers", primary_key: "customer_id"
  add_foreign_key "transactions", "users", primary_key: "user_id"
end
