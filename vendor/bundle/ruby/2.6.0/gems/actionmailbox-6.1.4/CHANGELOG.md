## Rails 6.1.4 (June 24, 2021)

- No changes.

## Rails 6.1.3.2 (May 05, 2021)

- No changes.

## Rails 6.1.3.1 (March 26, 2021)

- No changes.

## Rails 6.1.3 (February 17, 2021)

- No changes.

## Rails 6.1.2.1 (February 10, 2021)

- No changes.

## Rails 6.1.2 (February 09, 2021)

- No changes.

## Rails 6.1.1 (January 07, 2021)

- No changes.

## Rails 6.1.0 (December 09, 2020)

- Change default queue name of the incineration (`:action_mailbox_incineration`) and
  routing (`:action_mailbox_routing`) jobs to be the job adapter's default (`:default`).

  _Rafael Mendonça França_

- Sendgrid ingress now passes through the envelope recipient as `X-Original-To`.

  _Mark Haussmann_

- Update Mandrill inbound email route to respond appropriately to HEAD requests for URL health checks from Mandrill.

  _Bill Cromie_

- Add way to deliver emails via source instead of filling out a form through the conductor interface.

  _DHH_

- Mailgun ingress now passes through the envelope recipient as `X-Original-To`.

  _Rikki Pitt_

- Deprecate `Rails.application.credentials.action_mailbox.api_key` and `MAILGUN_INGRESS_API_KEY` in favor of `Rails.application.credentials.action_mailbox.signing_key` and `MAILGUN_INGRESS_SIGNING_KEY`.

  _Matthijs Vos_

- Allow easier creation of multi-part emails from the `create_inbound_email_from_mail` and `receive_inbound_email_from_mail` test helpers.

  _Michael Herold_

- Fix Bcc header not being included with emails from `create_inbound_email_from` test helpers.

  _jduff_

- Add `ApplicationMailbox.mailbox_for` to expose mailbox routing.

  _James Dabbs_

Please check [6-0-stable](https://github.com/rails/rails/blob/6-0-stable/actionmailbox/CHANGELOG.md) for previous changes.
