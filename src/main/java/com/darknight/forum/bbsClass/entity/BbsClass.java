package com.darknight.forum.bbsClass.entity;

import com.darknight.forum.base.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created with IntelliJ IDEA.
 * User: DarKnight
 * Date: 13-7-27
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 */
@Entity
@Table(name="t_forum_bbsclass")
public class BbsClass extends BaseEntity{
    private String name;
    private String type;
    private Integer sort;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }
}
