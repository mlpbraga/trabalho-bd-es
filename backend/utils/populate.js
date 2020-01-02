const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

module.exports = (sequelize, models) => {
  const {
    user,
    employee,
    Store,
    supplier,
    cashier,
    product,
    order,
    usercashier,
    employeeStore,
    productStore,
    cashierproduct,
    orderproduct,
    supplierproduct,
    usersupplierorder,
  } = models;

  sequelize.sync({ force: true })
    .then(async () => {
      await Store.create({
        name: 'loja centro',
        address: 'rua ramos ferreira, 1920, centro'
      });
      await cashier.create({
        number: 1,
        type: 'comum',
        status: 'ativo',
        storeId: 1,
      });
      await employee.create({
        name: 'maria muísa pereira braga',
        rg: '24091308',
        cpf: '00060907290',
        address: 'Rua Mozart Guarnierre, numero 1270, casa 12, Parque 10',
        phoneNumber: '92981055585',
        birthDate: '1997-10-10',
        role: 'gerente',
        salary: 1200,
      });
      await employee.create({
        name: 'luiz alexandre ale aloi',
        rg: '24091308',
        cpf: '00060907290',
        address: 'rua mozart guarnierre, numero 1270, casa 12, parque 10',
        phoneNumber: '92981055585',
        birthDate: '1997-07-21',
        role: 'gerente',
        salary: 1200,
      });
      await employeeStore.create({
        employeeId: 2,
        storeId: 1,
        entryTime: '1997-07-21 08:20',
        exitTime: '1997-07-22 19:20',
      });
      await user.create({
        username: 'teste',
        employeeId: 1,
        password: bcrypt.hashSync('123'),
      });
      await supplier.create({
        name: 'fornecedor 1',
        address: 'rua ramos ferreira, 1920, centro'
      });
      await supplier.create({
        name: 'fornecedor 2',
        address: 'rua ramos ferreira, 1920, centro'
      });
      await product.create({
        productId: 988,
        name: 'coca cola lata',
        unitFormat: 'unidade',
      });
      await product.create({
        productId: 812,
        name: 'maçã',
        unitFormat: 'quilo',
      });
      await product.create({
        productId: 111,
        name: 'aveia a granel',
        unitFormat: 'grama',
      });
      // await usercashier.create({
      //   userId: 'teste',
      //   cashierId: 1,
      //   shift: 'vespertino',
      // });
      await supplierproduct.create({
        supplierproductId: 1,
        productproductId: 812,
        suppliersupplierId: 1,
        sellin: 2.0,
      });
      await supplierproduct.create({
        supplierproductId: 2,
        productproductId: 812,
        suppliersupplierId: 2,
        sellin: 2.0,
      });

      await supplierproduct.create({
        supplierproductId: 2,
        productproductId: 111,
        suppliersupplierId: 2,
        sellin: 2.0,
      });

      // await supplierproduct.create({
      //   supplierproductId: 3,
      //   productId: 988,
      //   supplierId: 2,
      //   sellin: 2.0,
      // });
      // await supplierproduct.create({
      //   supplierproductId: 4,
      //   productId: 988,
      //   supplierId: 1,
      //   sellin: 2.0,
      // });
      // await productStore.create({
      //   productId: 988,
      //   storeId: 1,
      //   sellout: 5.30,
      //   stock: 500.0,
      // });
      // await productStore.create({
      //   productId: 812,
      //   storeId: 1,
      //   sellout: 10.20,
      //   stock: 250.4,
      // });
      await cashierproduct.create({
        productId: 812,
        cashierId: 1,
        quantity: 0.5,
        sellDate: '2019-02-12',
      });
      await cashierproduct.create({
        productId: 812,
        cashierId: 1,
        quantity: 0.7,
        sellDate: '2019-02-13',
      });
      // await order.create({
      //   orderId: 1,
      //   status: 'a caminho',
      //   orderDate: '2019-10-10',
      //   deliveryDate: '2019-10-13',
      // });
      // await orderproduct.create({
      //   orderId: 1,
      //   productId: 812,
      //   sellin: 3.00,
      //   quantity: 2.0,
      // });
      // await orderproduct.create({
      //   orderId: 1,
      //   productId: 988,
      //   sellin: 5.00,
      //   quantity: 2.0,
      // });
      // await orderproduct.create({
      //   orderId: 1,
      //   productId: 988,
      //   sellin: 5.00,
      //   quantity: 2.0,
      // });
      // await usersupplierorder.create({
      //   userId: 'teste',
      //   supplierId: 1,
      //   orderId: 1,
      // });
      logger.info('Database & tables created! Sync happened.');
    })
    // .catch((e) => console.log(e)) ;
};
