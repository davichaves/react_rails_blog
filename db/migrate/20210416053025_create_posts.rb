class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.string :image, default: 'https://via.placeholder.com/720x345.png'

      t.timestamps
    end
  end
end
