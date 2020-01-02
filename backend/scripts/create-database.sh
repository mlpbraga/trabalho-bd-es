npx sequelize model:create --name Store --attributes \
 "name:string, address:string"

npx sequelize model:create --name cashier --attributes \
 "number:integer, type:string, status:enum, storeId:integer"

npx sequelize model:create --name employee --attributes \
 "name:string, rg:string, cpf:string, address:string, phoneNumber:string, birthDate:date, role:enum, salary:double"

npx sequelize model:create --name user --attributes \
 "username:string, employeeId:integer, password:string"

npx sequelize model:create --name supplier --attributes \
 "name:string, address:string"

npx sequelize model:create --name product --attributes \
 "name:string, unitFormat:string"

npx sequelize model:create --name order --attributes \
 "status:enum, orderDate:date, deliveryDate:date, userId:interger, supplierId:integer"

npx sequelize model:create --name orderproduct --attributes \
 "orderId:integer, productId:integer, quantity:double, sellin:double"

npx sequelize model:create --name cashierproduct --attributes \
 "cashierId:integer, productId:integer, sellDate:date, quantity:double, sellout:double"

npx sequelize model:create --name supplierproduct --attributes \
 "productId:integer, supplierId:integer, sellin:double"

npx sequelize model:create --name usercashier --attributes \
 "cashierId:integer, userId:integer, shift:enum"

npx sequelize model:create --name employeestore --attributes \
 "employeeId:integer, storeId:integer, entryTime:date, exitTime:date"

npx sequelize model:create --name storeproduct --attributes \
 "stock:double, sellout:double, storeId:integer, productId:integer"