module Functions
  class FindUser < GraphQL::Function
    attr_reader :type

    def initialize
      @type = Types::UserType
    end

    description 'Retrieve the current user or a user given an ID'
    argument :id, types.ID, 'The ID of the user to retrieve'

    def call(_obj, args, context)
      record = args[:id].present? ? User.find(args[:id]) : context[:current_user]
      return nil if record.nil?

      GraphQLHelpers::Services::Authorize.new.call(context, record, :show?)
    end
  end
end
