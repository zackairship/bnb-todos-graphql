module Mutations
  class CreateUser < BaseMutation
    argument :user, Types::UserInputType, required: true

    field :jwt, String, null: true
    field :errors, [String], null: false

    def resolve(user:)
      attributes = GraphQLHelpers::Services::Attributes.new.call(User, { user: user.to_h })
      params = GraphQLHelpers::Services::PermittedParams.new.call(context, User, attributes, :create)

      user = User.create!(params)
      { jwt: user.jwt, errors: [] }
    rescue ActiveRecord::RecordInvalid => e
      { jwt: nil, errors: e.record.errors }
    end
  end
end
