interface IFuelTankConstructor {
  new (height: number, oiginalWidth: number, widthTop: number, widthBottom: void);
}
class FuelTank implements IFuelTankConstructor {
  constructor(height = 2, oiginalWidth = 2, widthTop = 2, widthBottom = 2) {
    return (
      <mesh>
        <cylinderGeometry />
      </mesh>
    );
  }
}

export default FuelTank;
