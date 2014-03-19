package com.darknight.forum.base.dao;

import com.darknight.forum.base.entity.BaseEntity;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import javax.persistence.EntityManager;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.internal.CriteriaImpl;
import org.hibernate.transform.ResultTransformer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

/**
 * Created with IntelliJ IDEA.
 * User: DarKnight
 * Date: 13-7-27
 * Time: 下午4:55
 * To change this template use File | Settings | File Templates.
 */
public class BaseJpaRepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID>
        implements BaseJpaRepository<T, ID>
{
    private Class<T> entityClass;
    private EntityManager entityManager;

    BaseJpaRepositoryImpl(Class<T> domainClass, EntityManager entityManager)
    {
        super(domainClass, entityManager);
        this.entityManager = entityManager;
        this.entityClass = domainClass;
    }

    public List<T> queryByMap(Map<String, Object> map)
    {
        return createCriteria(map).list();
    }

    public List<T> queryByCriteria(Criteria criteria)
    {
        return criteria.list();
    }

    public List<T> queryByMap(Map<String, Object> map, Sort sort)
    {
        Criteria criteria = createCriteria(map);
        Iterator it;
        if (sort != null) {
            for (it = sort.iterator(); it.hasNext(); ) {
                Sort.Order order = (Sort.Order)it.next();
                if (order.getDirection().equals(Sort.Direction.DESC))
                    criteria.addOrder(Order.desc(order.getProperty()));
                else {
                    criteria.addOrder(Order.asc(order.getProperty()));
                }
            }
        }
        return criteria.list();
    }

    public List<T> queryByCriteria(Criteria criteria, Sort sort)
    {
        Iterator it;
        if (sort != null) {
            for (it = sort.iterator(); it.hasNext(); ) {
                Sort.Order order = (Sort.Order)it.next();
                if (order.getDirection().equals(Sort.Direction.DESC))
                    criteria.addOrder(Order.desc(order.getProperty()));
                else {
                    criteria.addOrder(Order.asc(order.getProperty()));
                }
            }
        }
        return criteria.list();
    }

    public Page<T> queryPageByMap(Map<String, Object> map, Pageable pageable)
    {
        Criteria criteria = createCriteria(map);
        long total = countCriteriaResult(criteria);
        criteria.setFirstResult(pageable.getOffset()).setMaxResults(pageable.getPageSize());
        Iterator it;
        if (pageable.getSort() != null) {
            for (it = pageable.getSort().iterator(); it.hasNext(); ) {
                Sort.Order order = (Sort.Order)it.next();
                if (order.getDirection().equals(Sort.Direction.DESC))
                    criteria.addOrder(Order.desc(order.getProperty()));
                else {
                    criteria.addOrder(Order.asc(order.getProperty()));
                }
            }
        }
        Page page = new PageImpl(criteria.list(), pageable, total);
        return page;
    }

    public Page<T> queryPageByCriteria(Criteria criteria, Pageable pageable)
    {
        long total = countCriteriaResult(criteria);
        criteria.setFirstResult(pageable.getOffset()).setMaxResults(pageable.getPageSize());
        Iterator it;
        if (pageable.getSort() != null) {
            for (it = pageable.getSort().iterator(); it.hasNext(); ) {
                Sort.Order order = (Sort.Order)it.next();
                if (order.getDirection().equals(Sort.Direction.DESC))
                    criteria.addOrder(Order.desc(order.getProperty()));
                else {
                    criteria.addOrder(Order.asc(order.getProperty()));
                }
            }
        }
        Page page = new PageImpl(criteria.list(), pageable, total);
        return page;
    }

    public Criteria createCriteria(Map<String, Object> map)
    {
        Set set = map.entrySet();
        Criteria c = getSession().createCriteria(this.entityClass);
        for (Map.Entry entry : set) {
            Object obj = entry.getValue();
            if ((obj != null) && (StringUtils.isNotEmpty(obj.toString()))) {
                Criterion criterion = mapEntryToCriterion((String)entry.getKey(), entry.getValue());
                c.add(criterion);
            }
        }
        return c;
    }

    private Criterion mapEntryToCriterion(String key, Object value) {
        String[] k = key.split("_");
        if (k.length < 2)
            return Restrictions.eq(k[0], value);
        if (StringUtils.equals("eq", k[1]))
            return Restrictions.eq(k[0], value);
        if (StringUtils.equals("ne", k[1]))
            return Restrictions.ne(k[0], value);
        if (StringUtils.equals("lt", k[1]))
            return Restrictions.lt(k[0], value);
        if (StringUtils.equals("le", k[1]))
            return Restrictions.le(k[0], value);
        if (StringUtils.equals("gt", k[1]))
            return Restrictions.gt(k[0], value);
        if (StringUtils.equals("ge", k[1]))
            return Restrictions.ge(k[0], value);
        if (StringUtils.equals("li", k[1]))
            return Restrictions.like(k[0], "%" + value + "%");
        if (StringUtils.equals("nl", k[1]))
            return Restrictions.not(Restrictions.like(k[0], "%" + value + "%"));
        if (StringUtils.equals("in", k[1]))
            return Restrictions.in(k[0], (List)value);
        if (StringUtils.equals("ni", k[1])) {
            return Restrictions.not(Restrictions.in(k[0], (List)value));
        }
        return Restrictions.eq(key, value);
    }

    protected long countCriteriaResult(Criteria c)
    {
        CriteriaImpl impl = (CriteriaImpl)c;

        Projection projection = impl.getProjection();
        ResultTransformer transformer = impl.getResultTransformer();

        List orderEntries = null;
        try {
            orderEntries = (List)Reflections.getFieldValue(impl, "orderEntries");
            Reflections.setFieldValue(impl, "orderEntries", new ArrayList());
        } catch (Exception e) {
            e.printStackTrace();
        }

        Long totalCountObject = (Long)c.setProjection(Projections.rowCount()).uniqueResult();
        long totalCount = totalCountObject != null ? totalCountObject.longValue() : 0L;

        c.setProjection(projection);

        if (projection == null) {
            c.setResultTransformer(CriteriaSpecification.ROOT_ENTITY);
        }
        if (transformer != null)
            c.setResultTransformer(transformer);
        try
        {
            Reflections.setFieldValue(impl, "orderEntries", orderEntries);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return totalCount;
    }

    public int nativeSqlUpdate(String sql, Object[] values)
    {
        SQLQuery query = getSession().createSQLQuery(sql);
        if (values != null) {
            for (int i = 0; i < values.length; i++) {
                query.setParameter(i, values[i]);
            }
        }
        return query.executeUpdate();
    }

    public int nativeSqlUpdate(String sql, Map<String, ?> values)
    {
        SQLQuery query = getSession().createSQLQuery(sql);
        if (values != null) query.setProperties(values);
        return query.executeUpdate();
    }

    public T saveEntity(T entity)
    {
        if ((entity instanceof IdEntity)) {
            ((IdEntity)entity).setUpdateTime(new Date());
        }
        return saveAndFlush(entity);
    }

    public List<T> queryByMap(Map<String, Object> map, int limit)
    {
        Criteria criteria = createCriteria(map);
        criteria.setFirstResult(0).setMaxResults(limit);
        return criteria.list();
    }

    public List<T> queryByMap(Map<String, Object> map, int limit, Sort sort)
    {
        Criteria criteria = createCriteria(map);
        criteria.setFirstResult(0).setMaxResults(limit);
        Iterator it;
        if (sort != null) {
            for (it = sort.iterator(); it.hasNext(); ) {
                Sort.Order order = (Sort.Order)it.next();
                if (order.getDirection().equals(Sort.Direction.DESC))
                    criteria.addOrder(Order.desc(order.getProperty()));
                else {
                    criteria.addOrder(Order.asc(order.getProperty()));
                }
            }
        }
        return criteria.list();
    }

    public List<T> queryByMap(Map<String, Object> map, int offset, int limit)
    {
        Criteria criteria = createCriteria(map);
        criteria.setFirstResult(offset).setMaxResults(limit);
        return criteria.list();
    }

    public List<T> queryByMap(Map<String, Object> map, int offset, int limit, Sort sort)
    {
        Criteria criteria = createCriteria(map);
        criteria.setFirstResult(offset).setMaxResults(limit);
        Iterator it;
        if (sort != null) {
            for (it = sort.iterator(); it.hasNext(); ) {
                Sort.Order order = (Sort.Order)it.next();
                if (order.getDirection().equals(Sort.Direction.DESC))
                    criteria.addOrder(Order.desc(order.getProperty()));
                else {
                    criteria.addOrder(Order.asc(order.getProperty()));
                }
            }
        }
        return criteria.list();
    }

    public List<T> queryByCriteria(Criteria criteria, int limit)
    {
        return criteria.setFirstResult(0).setMaxResults(limit).list();
    }

    public List<T> queryByCriteria(Criteria criteria, int limit, Sort sort)
    {
        criteria.setFirstResult(0).setMaxResults(limit);
        Iterator it;
        if (sort != null) {
            for (it = sort.iterator(); it.hasNext(); ) {
                Sort.Order order = (Sort.Order)it.next();
                if (order.getDirection().equals(Sort.Direction.DESC))
                    criteria.addOrder(Order.desc(order.getProperty()));
                else {
                    criteria.addOrder(Order.asc(order.getProperty()));
                }
            }
        }
        return criteria.list();
    }

    public List<T> queryByCriteria(Criteria criteria, int offset, int limit)
    {
        return criteria.setFirstResult(offset).setMaxResults(limit).list();
    }

    public List<T> queryByCriteria(Criteria criteria, int offset, int limit, Sort sort)
    {
        criteria.setFirstResult(offset).setMaxResults(limit);
        Iterator it;
        if (sort != null) {
            for (it = sort.iterator(); it.hasNext(); ) {
                Sort.Order order = (Sort.Order)it.next();
                if (order.getDirection().equals(Sort.Direction.DESC))
                    criteria.addOrder(Order.desc(order.getProperty()));
                else {
                    criteria.addOrder(Order.asc(order.getProperty()));
                }
            }
        }
        return criteria.list();
    }

    private Session getSession() {
        return (Session)this.entityManager.getDelegate();
    }
}
