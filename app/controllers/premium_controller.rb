class PremiumController < ApplicationController
  before_action :authenticate_user!

  def new
    if user_signed_in? && current_user.subscribed?
      redirect_to root_path, notice: "You are already a subscriber!"
    end
  end

  def create
    Stripe.api_key = Rails.application.credentials.stripe_api_key
    price_id = Rails.application.credentials.webbit_price_id
    token = params[:stripeToken]

    customer = if current_user.stripe_id?
                Stripe::Customer.retrieve(current_user.stripe_id)
              else
                Stripe::Customer.create(email: current_user.email, source: token)
              end

    subscription = Stripe::Subscription.create({
      customer: customer.id,
      items: [
        {price: price_id},
      ],
    })

    options = {
      stripe_id: customer.id,
      stripe_subscription_id: subscription.id,
      subscribed: true
    }

    options.merge!(
      card_last4: params[:user][:card_last4],
      card_exp_month: params[:user][:card_exp_month],
      card_exp_year: params[:user][:card_exp_year],
      card_type: params[:user][:card_type]
    ) if params[:user][:card_last4]

    current_user.update(options)

    redirect_to root_path, notice: "You subscription was setup successfully!"
  end

  def destroy
    subscription = Stripe::Subscription.delete(current_user.stripe_subscription_id)
    current_user.update(stripe_subscription_id: nil)
    current_user.update(subscribed: false)

    redirect_to root_path, notice: "Your subscription has been cancelled"
  end
end