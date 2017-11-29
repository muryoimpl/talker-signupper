# frozen_string_literal: true
module LoggerUtility
  private

  def log_error(e)
    return unless e
    Rails.logger.error(<<~ERR)
      #{e.class} #{e.message}
      #{e.backtrace.join("\n")}
    ERR
  end

  def log_warn(e)
    return unless e
    Rails.logger.warn(<<~WARN)
      #{e.class} #{e.message}
      #{e.backtrace.join("\n")}
    WARN
  end
end
