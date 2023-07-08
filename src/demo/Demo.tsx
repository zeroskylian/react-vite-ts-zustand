import less from '@/css/less/base.module.less';
// import css from '@/css/index.module.css';
import css from '../css/index.module.css';

export default function Demo() {
  return (
    <div>
      <div id={less.demo}>Demo</div>
      <div className={css.header}>666</div>
    </div>
  );
}
