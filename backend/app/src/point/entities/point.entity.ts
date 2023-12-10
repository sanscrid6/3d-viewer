import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Entity()
export class Point {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  x: number;

  @Column({ type: 'float' })
  y: number;

  @Column({ type: 'float' })
  z: number;

  @Column()
  number: number;

  @ManyToOne(() => Location, { onDelete: 'CASCADE' })
  location: Location;
}
