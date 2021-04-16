# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

9.times do |i|
  Post.create(
    title: "Post #{i + 1}",
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non lacinia augue. Nulla iaculis risus sed interdum scelerisque. Ut id dolor nibh. Etiam et risus et metus dignissim suscipit. Cras quis faucibus nulla. Ut ac auctor ex. Cras posuere purus lorem. Pellentesque non arcu nisl. Sed sit amet risus eget ligula fringilla sollicitudin. Suspendisse interdum magna quis pulvinar dignissim. Integer convallis ante enim, id viverra ante auctor at. Nullam faucibus nunc eget faucibus pretium. Fusce placerat neque dolor, eget iaculis neque pharetra vel. Sed maximus, tortor nec lobortis aliquet, ipsum eros malesuada magna, eget rutrum tellus arcu eu ipsum.',
  )
end
