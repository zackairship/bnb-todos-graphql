class UserPolicy < AuthenticatedPolicy
  def permitted_attributes
    %i[first_name last_name]
  end

  def permitted_attributes_for_create
    %i[email password first_name last_name]
  end

  def show?
    record == user
  end
end
