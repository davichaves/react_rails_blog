class Api::V1::PostsController < ApplicationController
  def index
    post = Post.all
    response = JSON.parse(RestClient.get "https://newsapi.org/v2/everything?q=Watches&from=2021-04-16&sortBy=popularity&apiKey=#{ENV['NEWS_API_KEY']}")
    @initial_id = post.count+1
    @remote_posts = response['articles'].map.with_index { |ar, i| Post.new(id: @initial_id+i, title: ar['title'], content: ar['content'], image: ar['urlToImage'], created_at: ar['publishedAt'], updated_at: ar['publishedAt']) }
    render json: post + @remote_posts
  end

  def local
    post = Post.all
    render json: post
  end

  def create
    post = Post.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def destroy
    post&.destroy
    render json: { message: 'Post deleted!' }
  end

  private

  def post_params
    params.permit(:title, :content, :image)
  end

  def post
    @post ||= Post.find(params[:id])
  end
end
