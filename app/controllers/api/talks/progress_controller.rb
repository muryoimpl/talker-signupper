# frozen_string_literal: true

class Api::Talks::ProgressController < Api::ApplicationController
  def update
    talk = Talk.find(params[:id])

    unless permitted_value?(progress_params[:progress])
      head :bad_request
      return
    end

    talk.update!(progress_params)
    head :ok
  rescue ActiveRecord::RecordNotFound
    head :not_found
  rescue => e
    log_error(e)
    head :internal_server_error
  end

  private

  def progress_params
    params.permit(:progress)
  end

  def permitted_value?(progress)
    Talk.progresses.key? progress
  end
end
