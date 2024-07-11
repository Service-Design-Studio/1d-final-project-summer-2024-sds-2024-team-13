require 'rails_helper'

RSpec.describe "users/edit", type: :view do
  let(:user) {
    User.create!(
      name: "MyString",
      phone_num: "MyString"
    )
  }

  before(:each) do
    assign(:user, user)
  end

  it "renders the edit user form" do
    render
    assert_select "form[action=?][method=?]", user_path(user), "post" do
      assert_select "input[name=?]", "user[name]"
      assert_select "input[name=?]", "user[phone_num]"
    end
  end
end
