package com.darknight.forum.base.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.hibernate.Criteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created with IntelliJ IDEA.
 * User: DarKnight
 * Date: 13-7-27
 * Time: 下午4:51
 * To change this template use File | Settings | File Templates.
 */
public abstract interface BaseJpaRepository<T, ID extends Serializable> extends JpaRepository<T, ID>
{
    public abstract List<T> queryByMap(Map<String, Object> paramMap);

    public abstract List<T> queryByMap(Map<String, Object> paramMap, int paramInt);

    public abstract List<T> queryByMap(Map<String, Object> paramMap, int paramInt, Sort paramSort);

    public abstract List<T> queryByMap(Map<String, Object> paramMap, int paramInt1, int paramInt2);

    public abstract List<T> queryByMap(Map<String, Object> paramMap, int paramInt1, int paramInt2, Sort paramSort);

    public abstract List<T> queryByMap(Map<String, Object> paramMap, Sort paramSort);

    public abstract List<T> queryByCriteria(Criteria paramCriteria);

    public abstract List<T> queryByCriteria(Criteria paramCriteria, int paramInt);

    public abstract List<T> queryByCriteria(Criteria paramCriteria, int paramInt, Sort paramSort);

    public abstract List<T> queryByCriteria(Criteria paramCriteria, int paramInt1, int paramInt2);

    public abstract List<T> queryByCriteria(Criteria paramCriteria, int paramInt1, int paramInt2, Sort paramSort);

    public abstract List<T> queryByCriteria(Criteria paramCriteria, Sort paramSort);

    public abstract Page<T> queryPageByMap(Map<String, Object> paramMap, Pageable paramPageable);

    public abstract Page<T> queryPageByCriteria(Criteria paramCriteria, Pageable paramPageable);

    public abstract Criteria createCriteria(Map<String, Object> paramMap);

    public abstract int nativeSqlUpdate(String paramString, Object[] paramArrayOfObject);

    public abstract int nativeSqlUpdate(String paramString, Map<String, ?> paramMap);

    public abstract T saveEntity(T paramT);
}
