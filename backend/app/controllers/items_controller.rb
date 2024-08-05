class ItemsController < ApplicationController
  before_action :set_user
  before_action :set_item, only: %i[ show edit update destroy ]

  # GET /items or /items.json
  def index
    @items = @user.items
    render json: @items.map { |item| item.as_json.merge(image: url_for(item.image)) }
  end

  # GET /items/1 or /items/1.json
  def show
    if @item
      render json: { item: @item, image: url_for(@item.image) }
    end
  end

  
  # POST /items or /items.json
  def create
    @item = @user.items.build(item_params)

    if @item.save
      render json: { 
        status: 'Item created successfully', 
        item: {
          id: @item.id,
          name: @item.name,
          price: @item.price,
          created_at: @item.created_at,
          updated_at: @item.updated_at,
          user_id: @item.user_id,
          image: url_for(@item.image) # Include the image URL in the response
        }
      }, status: :created
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /items/1 or /items/1.json
  def update
    if @item.update(item_params)
      render json: { status: 'item updated successfully', item: @item }, status: :ok
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity 
    end
  end


  # DELETE /items/1 or /items/1.json
  def destroy
    @item.destroy
    render json: { status: 'item deleted successfully' }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_item
    @item = @user.items.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def item_params
    params.require(:item).permit(:name, :price, :image)
  end
end
