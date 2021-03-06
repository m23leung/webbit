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

- Make `retry_job` return the job that was created.

  _Rafael Mendonça França_

- Include `ActiveSupport::Testing::Assertions` in `ActiveJob::TestHelpers`.

  _Mikkel Malmberg_

## Rails 6.1.0 (December 09, 2020)

- Recover nano precision when serializing `Time`, `TimeWithZone` and `DateTime` objects.

  _Alan Tan_

- Deprecate `config.active_job.return_false_on_aborted_enqueue`.

  _Rafael Mendonça França_

- Return `false` when enqueuing a job is aborted.

  _Rafael Mendonça França_

- While using `perform_enqueued_jobs` test helper enqueued jobs must be stored for the later check with
  `assert_enqueued_with`.

  _Dmitry Polushkin_

- `ActiveJob::TestCase#perform_enqueued_jobs` without a block removes performed jobs from the queue.

  That way the helper can be called multiple times and not perform a job invocation multiple times.

  ```ruby
  def test_jobs
    HelloJob.perform_later("rafael")
    perform_enqueued_jobs # only runs with "rafael"
    HelloJob.perform_later("david")
    perform_enqueued_jobs # only runs with "david"
  end
  ```

  _Étienne Barrié_

- `ActiveJob::TestCase#perform_enqueued_jobs` will no longer perform retries:

  When calling `perform_enqueued_jobs` without a block, the adapter will
  now perform jobs that are **already** in the queue. Jobs that will end up in
  the queue afterwards won't be performed.

  This change only affects `perform_enqueued_jobs` when no block is given.

  _Edouard Chin_

- Add queue name support to Que adapter.

  _Brad Nauta_, _Wojciech Wnętrzak_

- Don't run `after_enqueue` and `after_perform` callbacks if the callback chain is halted.

      class MyJob < ApplicationJob
        before_enqueue { throw(:abort) }
        after_enqueue { # won't enter here anymore }
      end

  `after_enqueue` and `after_perform` callbacks will no longer run if the callback chain is halted.
  This behaviour is a breaking change and won't take effect until Rails 6.2.
  To enable this behaviour in your app right now, you can add in your app's configuration file
  `config.active_job.skip_after_callbacks_if_terminated = true`.

  _Edouard Chin_

- Fix enqueuing and performing incorrect logging message.

  Jobs will no longer always log "Enqueued MyJob" or "Performed MyJob" when they actually didn't get enqueued/performed.

  ```ruby
    class MyJob < ApplicationJob
      before_enqueue { throw(:abort) }
    end

    MyJob.perform_later # Will no longer log "Enqueued MyJob" since job wasn't even enqueued through adapter.
  ```

  A new message will be logged in case a job couldn't be enqueued, either because the callback chain was halted or
  because an exception happened during enqueuing. (i.e. Redis is down when you try to enqueue your job)

  _Edouard Chin_

- Add an option to disable logging of the job arguments when enqueuing and executing the job.

      class SensitiveJob < ApplicationJob
        self.log_arguments = false

        def perform(my_sensitive_argument)
        end
      end

  When dealing with sensitive arguments as password and tokens it is now possible to configure the job
  to not put the sensitive argument in the logs.

  _Rafael Mendonça França_

- Changes in `queue_name_prefix` of a job no longer affects all other jobs.

  Fixes #37084.

  _Lucas Mansur_

- Allow `Class` and `Module` instances to be serialized.

  _Kevin Deisz_

- Log potential matches in `assert_enqueued_with` and `assert_performed_with`.

  _Gareth du Plooy_

- Add `at` argument to the `perform_enqueued_jobs` test helper.

  _John Crepezzi_, _Eileen Uchitelle_

- `assert_enqueued_with` and `assert_performed_with` can now test jobs with relative delay.

  _Vlado Cingel_

- Add jitter to `ActiveJob::Exceptions.retry_on`.

  `ActiveJob::Exceptions.retry_on` now uses a random amount of jitter in order to
  prevent the [thundering herd effect](https://en.wikipedia.org/wiki/Thundering_herd_problem). Defaults to
  15% (represented as 0.15) but overridable via the `:jitter` option when using `retry_on`.
  Jitter is applied when an `Integer`, `ActiveSupport::Duration` or `:exponentially_longer`, is passed to the `wait` argument in `retry_on`.

  ```ruby
  retry_on(MyError, wait: :exponentially_longer, jitter: 0.30)
  ```

  _Anthony Ross_

Please check [6-0-stable](https://github.com/rails/rails/blob/6-0-stable/activejob/CHANGELOG.md) for previous changes.
