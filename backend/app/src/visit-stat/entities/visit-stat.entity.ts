import { Point } from 'src/point/entities/point.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VisitStat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Point, { onDelete: 'CASCADE' })
  point: Point;
}
