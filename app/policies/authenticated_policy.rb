class AuthenticatedPolicy < ApplicationPolicy
  def initialize(user, record)
    raise Pundit::NotAuthorizedError, 'Must be authenticated' unless user

    @user = user
    @record = record
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      raise Pundit::NotAuthorizedError, 'Must be authenticated' unless user

      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end
