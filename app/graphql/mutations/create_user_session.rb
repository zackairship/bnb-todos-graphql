module Mutations
  class CreateUser < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true

    field :jwt, String, null: true
    field :errors, [String], null: false

    def resolve(email:, password:)
      user = User.find_by!(email: email)
      if user.authenticate(password)
        { jwt: user.jwt, errors: [] }
      else
        { jwt: nil, errors: ['Invalid password.'] }
      end
    rescue ActiveRecord::RecordNotFound => e
      { jwt: nil, errors: ['User not found.'] }
    end
  end
end
