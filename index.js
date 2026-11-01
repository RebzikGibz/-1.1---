const sequelize = require('./db');
const { Car } = require('./models');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('✅ Подключение к базе данных установлено.');

    await sequelize.sync({ force: true });
    console.log('✅ Таблица создана/синхронизирована.');

    await Car.bulkCreate([
      { brand: 'Toyota', model: 'Camry', year: 2022, price: 2500000, isAvailable: true },
      { brand: 'BMW', model: 'X5', year: 2021, price: 5500000, isAvailable: true },
      { brand: 'Lada', model: 'Vesta', year: 2020, price: 1200000, isAvailable: false },
    ]);
    console.log('✅ Добавлено 3 автомобиля.');

    const cars = await Car.findAll();
    console.log('\n📋 Список автомобилей в базе:');
    cars.forEach((car) => {
      console.log(
        `  #${car.id} — ${car.brand} ${car.model} (${car.year} г.), ${car.price} ₽, ${car.isAvailable ? 'в наличии' : 'продано'}`
      );
    });

    await sequelize.close();
    console.log('\n🔒 Соединение закрыто. Работа завершена.');
  } catch (error) {
    console.error('❌ Ошибка:', error);
    await sequelize.close();
  }
}

main();