import { Point } from 'src/point/entities/point.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DurationStat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  timestamp: Date;

  @Column({ type: 'float' })
  duration: number;

  @ManyToOne(() => Point, { onDelete: 'CASCADE' })
  point: Point;
}
