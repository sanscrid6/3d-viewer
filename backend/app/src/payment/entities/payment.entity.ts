import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryColumn()
  hash: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ type: 'decimal', precision: 100, scale: 2 })
  amount: number;
}
